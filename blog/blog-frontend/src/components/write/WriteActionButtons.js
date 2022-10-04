import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        // 버튼이 연속해서 나올 때
        margin-left: 0.5rem; //버튼들 사이에 왼쪽에 간격을 0.5rem 줘라
    }
`;

const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem;
    }
`;


const WriteActionButtons = ({onCancle, onPublish ,isEdit}) => {

    return (
        <WriteActionButtonsBlock>
            <StyledButton cyan onClick={onPublish}>포스트 {isEdit ? '수정' : '등록'}</StyledButton>
            <StyledButton onClick={onCancle}>취소</StyledButton>
        </WriteActionButtonsBlock>
    );
};

export default WriteActionButtons;