import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/common/PostViewerContainer';

const PostPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostViewerContainer />
            <div>comment</div>
        </>
    );
};

export default PostPage;
