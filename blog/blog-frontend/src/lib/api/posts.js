import client from './client';
import qs from 'qs';

export const writePost = ({title, body, tags}) =>
    client.post('http://localhost:8001/api/post', {title, body, tags}, {withCredentials: true});
export const readPost = id => client.get(`http://localhost:8001/api/post/${id}`, {withCredentials: true});

export const listPosts = ({page, username, tag}) => {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    console.log(`http://localhost:8001/api/post/?${queryString}`)
    return client.get(`http://localhost:8001/api/post/?${queryString}`, {withCredentials: true});
}

export const updatePost = ({id, title, body, tags}) => 
    client.patch(`http://localhost:8001/api/post/${id}`,
    {
        title,
        body,
        tags,
    },
    {
        withCredentials: true
    }
);

export const removePost = id => client.delete(`http://localhost:8001/api/post/${id}`, {withCredentials: true});
