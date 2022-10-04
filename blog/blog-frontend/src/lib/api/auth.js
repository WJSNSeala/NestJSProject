import client from './client';

export const login = ({username, password}) => 
    client.post('http://localhost:8001/api/auth/login', {username, password}, {withCredentials: true});

export const register = ({username, password}) =>
    client.post('http://localhost:8001/api/auth/register', {username, password}, {withCredentials: true});

export const check = () => client.get('http://localhost:8001/api/auth/check', {withCredentials: true});

export const logout = () => client.post('http://localhost:8001/api/auth/logout', {withCredentials: true});
