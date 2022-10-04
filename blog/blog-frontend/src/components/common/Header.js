import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Responsive from './Responsive';
import { Link } from '../../../node_modules/react-router-dom/index';

const HeaderBlock = styled.div`
    position: fixed;
    // header element를 상단에 고정
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right {
        display: flex;
        align-items: center;
    }
`;

/*
header가 fixed이기 때문에, 페이지의 content가 4rem아래 나타나도록
*/
const Spacer = styled.div`
    height: 4rem;    
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({user, onLogout}) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className='logo'>
                        REACTERS
                    </Link>
                    {user ? (
                        <div className='right'>
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>LOGOUT</Button>
                        </div>
                    ) : (
                        <div className='right'>
                            <Button to="/login">LOGIN</Button>
                        </div>
                    )}

                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;