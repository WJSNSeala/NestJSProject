import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, register} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import {useNavigate} from 'react-router-dom';

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {form, auth, authError, user} = useSelector(
        ({auth, user}) => ({
            form: auth.register,
            auth: auth.auth,
            authError: auth.authError,
            user: user.user,
        })
    );

    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form:'register',
                key:name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        if ([username, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (password !== passwordConfirm) {
            setError('패스워드가 일치하지 않습니다.');
            dispatch(changeField({form: 'register', key:'password', value:''}));
            dispatch(changeField({form: 'register', key:'passwordConfirms', value:''}));
            return;
        }
        dispatch(register({username, password}));
    }

    useEffect(
        () => {
            dispatch(initializeForm('register'));
        },
        [dispatch]
    );
    
    useEffect( // 성공 실패시 인증에 대한 정보가 남는다.
        () => {
            console.log("REGISTER EFFECT: ", auth)
            if (authError) {
                if(authError.response.status === 409) {
                    setError('이미 존재하는 계정입니다');
                    return;
                }
                setError('회원가입 실패');
                return;
            }
            if (auth) {
                console.log('register success');
                console.log(auth);
                dispatch(check());
                navigate('/');
            }
        }, [auth, authError, dispatch]
    );
    
    useEffect(
        () => {
            if (user) {
                navigate('/');
                try {
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (e) {
                    console.log('local storage is not working');
                }
            }
        }, [user]
    )
    return (
        <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        />
    );
};

export default RegisterForm;