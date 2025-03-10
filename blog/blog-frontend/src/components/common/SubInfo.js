import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import palette from '../../lib/styles/pallete';

const SubInfoBlock = styled.div`
    ${props => 
        props.hasMarginTop &&
        css`
            margin-top: 1rem;
        `
    }
    color: ${palette.gray[6]};

    span + span::before {
        color: ${palette.gray[4]};
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        content: '\\B7';
    }
`;

const SubInfo = ({username, publishedDate, hasMarginTop}) => {
    return (
        <SubInfoBlock hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    <Link to={`/@${username}`}>{username}</Link>
                </b>
            </span>
            <span>
                {new Date(publishedDate).toLocaleDateString()}
            </span>
        </SubInfoBlock>
    );
};

export default SubInfo;