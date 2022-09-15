const axios = require('axios');

const getBreeds = async () => {
  try {
    return await axios.post('http://localhost:8001/users', {
      name: 'djkim',
      email: 'harhyom9189@korea.ac.kr',
      password: 'test1234',
    });
  } catch (error) {
    console.error(error);
  }
};

res = getBreeds();

console.log(res.data);
