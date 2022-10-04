import React, {useEffect} from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from '../../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import { writePost, updatePost } from '../../modules/write';


const WriteActionButtonsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {title, body, tags, post, postError, originalPostId} = useSelector(
        ({write}) => ({
            title: write.title,
            body: write.body,
            tags: write.tags,
            post: write.post,
            postError: write.postError,
            originalPostId: write.originalPostId,
        })
    );

    const onPublish = () => {
        if (originalPostId) {
            dispatch(updatePost({title, body, tags, id: originalPostId}));
            return;
        }
        dispatch(
            writePost({
                title, body, tags,
            }),
        );
    };

    const onCancel = () => {
        navigate(-1)
    }

    useEffect(
        () => {
            if (post) {
                console.log("WRITEBUTTON: POST", post);
                console.log("WRITEBUTTON: USER", post.user);
                const {id, username} = post;
                navigate(`/@${username}/${id}`);
            }
            if (postError) {
                console.log(postError);
            }
        }, [navigate, post, postError]
    );

    return <WriteActionButtons onPublish={onPublish} onCancle={onCancel} isEdit={!!originalPostId}/>;
};

export default WriteActionButtonsContainer;