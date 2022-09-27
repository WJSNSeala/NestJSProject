import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {

    const token = ctx.cookies.get('access_token');
    if (!token) {
        console.log('-------------no token request--------------')
        console.log(ctx.request);
        console.log("jwtMiddleware.js : no token in request");
        return next(); // no token, just pass to next middle ware
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        }
        
        console.log('----------token exist request-----------');
        console.log(ctx);
        console.log("jwtMiddleware.js : get token success : ", decoded);
        
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findById(decoded._id);
            const token = user.generateToken();
            ctx.cookies.set('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,// 7일
                httpOnly: true,
            });
        }

        console.log("response: ", ctx.response);
        console.log('response.header: ', ctx.response.headers);
        
        return next();

    } catch(e) {
        return next();
        // verification fail
    }
};

export default jwtMiddleware;
