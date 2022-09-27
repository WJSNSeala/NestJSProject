import Post from '../../models/posts';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import sanitizeHtml from 'sanitize-html';

const {ObjectId} = mongoose.Types;

const sanitizeOption = {

    allowdTags: [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src'],
        li: ['class'],
    },
    allowedSchemes: ['data', 'http'],
};


export const getPostById = async (ctx, next) => {
    const {id} = ctx.params;

    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    try {
        const post = await Post.findById(id);
        if(!post) {
            ctx.status=404;
            return;
        }
        ctx.state.post=post;
        return next();
    } catch(e){
        ctx.throw(500, e);
    }
}

export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state;
    if (post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
}

/*
POST /api/posts
{
    title: 'title',
    body: 'content',
    tags: ['tag1', 'tag2']
}
*/ 
export const write = async ctx => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array()
        .items(Joi.string()).required()
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {title, body, tags} = ctx.request.body;
    console.log(title, body, tags);

    const post = new Post({
        title, 
        body: sanitizeHtml(body, sanitizeOption), 
        tags,
        user: ctx.state.user,
    });

    try {
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
GET /api/posts

*/
const removeHtmlAndShorten = body => {
    const filterd = sanitizeHtml(body, {
        allowedTags: [],
    });
    return filterd.length < 200 ? filterd : `${filterd.slice(0, 200)}...`;
};

export const list = async ctx => {
    const page = parseInt(ctx.query.page || '1', 10);

    if (page < 1) {
        ctx.status = 400;
        return;
    }

    const {tag, username} = ctx.query;
    const query = {
        ...(username ? {'user.username':username} : {}),
        ...(tag ? {tags: tag} : {}),
    }

    try {
        const posts = await Post
        .find(query)
        .sort({_id: -1})
        .limit(10)
        .skip((page -1) * 10)
        .exec();
        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts
        .map(post => post.toJSON())
        .map(post => ({
            ...post,
            body: removeHtmlAndShorten(post.body),
        }));
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
GET /api/posts/:id
*/
export const read = async ctx => {
    ctx.body = ctx.state.post;
};

export const remove = async ctx => {
    const {id} = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // 성공했지만 응답할 데이터는 없음
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const update= async ctx => {
    const {id} = ctx.params;
    
    console.log('update function : ', id);
    
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const nextData = {...ctx.request.body};
    if (nextData.body) {
        nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
    }
    try {
        const post = await Post.findByIdAndUpdate(
            id, nextData, {
                new: true
            }
        ).exec();

        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};









