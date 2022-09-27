const axios = require('axios');

axios
.get('http://121.137.72.141:8000/api/auth/login', {username:'test1', password:'test123'})
.then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    console.log(res);
}).catch(error => {
    console.error(error);
});

