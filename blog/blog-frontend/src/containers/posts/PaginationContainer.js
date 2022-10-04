import React from 'react';
import Pagination from '../../components/post/Pagination';
import { useSelector } from '../../../node_modules/react-redux/es/exports';
import qs from 'qs';
import {useLocation, useParams} from 'react-router-dom';

const PaginationContainer = () => {
    const {search} = useLocation();
    const params = useParams();

    const {lastPage, posts, loading} = useSelector(
        ({posts, loading}) => ({
            lastPage: posts.lastPage,
            posts: posts.posts,
            loading: loading['posts/LIST_POSTS'],
        })
    );

    if (!posts || loading) return null;

    const username = params.username;

    const {tag, page=1} = qs.parse(search, {ignoreQueryPrefix: true,});

    return (
        <Pagination tag={tag} username={username} page={parseInt(page, 10)} lastPage={lastPage} />
    );
};

export default PaginationContainer;