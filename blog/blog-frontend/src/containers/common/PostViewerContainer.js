import React, {useEffect} from 'react';
import { useDispatch, useSelector } from '../../../node_modules/react-redux/es/exports';
import { useNavigate, useParams } from 'react-router-dom'
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
    //         <Route element={<PostPage />} path='/@:username/:postId' />
    const params = useParams();
    const postId = params.postId;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {post, error, loading, user} = useSelector(
        ({post, loading, user}) => ({
            post: post.post,
            error: post.error,
            loading: loading['post/READ_POST'], // true or false
            /*
            [START_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true
            */
           user: user.user,
        }),
    );

    useEffect(
        () => {
            dispatch(readPost(postId));
            // unmount될 때는 포스트 데이터 없애기
            // cleanup function
            return () => {
                dispatch(unloadPost());
            };
        },
        [dispatch, postId]
    );

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        navigate('/write');
    }

    const onRemove = async () => {
        try {
            await removePost(postId);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }

    const ownPost = (user && user.userId) === (post && post.userId);
    return <PostViewer post={post} loading={loading} error={error} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}/>;
};

export default PostViewerContainer;