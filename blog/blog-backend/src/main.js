require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
import cors from '@koa/cors';

const {PORT, MONGO_URI} = process.env;

mongoose
.connect(MONGO_URI, {useNewUrlParser: true})
.then(() =>{
    console.log('connected to mongoDB');
    // createFakeData();
})
.catch(e => {
    console.error(e);
});


const app = new Koa();
const router = new Router();
app.use(cors({
    origin: 'http://121.137.72.141:8001',
    allowMethods: 'POST, GET, DELETE, OPTIONS, PATCH',
    credentials: true,
    exposeHeaders: ['Last-Page'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.use('/api', api.routes()); // api 라우터 적용

app.use(bodyParser()); // router 적용 전에 사용

    
app.use(jwtMiddleware);


    
app.use(
    router.routes()
).use(router.allowedMethods());

const port = PORT || 8000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});

