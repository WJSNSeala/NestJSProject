import axios from 'axios';

axios.defaults.withCredentials = true;


const client = axios.create();

export default client;
