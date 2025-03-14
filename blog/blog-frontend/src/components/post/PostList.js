import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/pallete';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from '../../../node_modules/react-router-dom/index';

const PostListBlock = styled(Responsive)`
    margin-bottom: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }

    p {
        margin-top: 2rem;
    }
`;


const PostItem = ({post}) => {
    const {publishedDate, username, tags, title, body, id} = post
    console.log("POSTITEM: ", username);
    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${username}/${id}`}>{title}</Link>
            </h2>
            <SubInfo username={username} publishedDate={new Date(publishedDate)} />
            <Tags tags={tags}/>
            <p>{body}</p>
        </PostItemBlock>
    )
}

const PostList = ({posts, loading, error, showWriteButton}) => {
    if (error) {
        return <PostListBlock>Error occured</PostListBlock>;
    }
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && <Button cyan to="/write">새 글 작성하기</Button>}                
            </WritePostButtonWrapper>
            {!loading && posts && (
                <div>
                    {posts.map(
                        post => <PostItem post={post} key={post.id} />
                    )}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;