import axios from 'axios';

const json = JSON.stringify({
  name: 'djkim',
  email: 'harhyom9189@gmail.com',
  password: 'testtest123',
});

const test = axios.post('http://localhost:3000/auth/login', json, {
  headers: { 'Content-Type': 'application/json' },
});
``