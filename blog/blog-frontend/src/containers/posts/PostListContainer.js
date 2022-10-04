import React, { useEffect } from 'react';
import qs from 'qs';
import {useDispatch, useSelector} from 'react-redux';
import PostList from '../../components/post/PostList';
import {listPosts} from '../../modules/posts';
import {useLocation, useParams} from 'react-router-dom';


const PostListContainer = () => {
    const {search}= useLocation();
    const parmas = useParams();
    console.log(parmas);
    const dispatch = useDispatch();
    const {posts, error, loading, user} = useSelector(
        ({posts, loading, user}) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );
    console.log("POSTLISTCONTAINER: ", posts, user);

    useEffect(
        () => {
            const username = parmas.username;
            const {tag, page} = qs.parse(search, {ignoreQueryPrefix: true});
            dispatch(listPosts({tag, username, page}));

        }, [dispatch, search]
    );

    return (
        <PostList loading={loading} error={error} posts={posts} showWriteButton={user} />
    );
};

export default PostListContainer;