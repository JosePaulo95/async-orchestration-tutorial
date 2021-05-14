var axios = require('axios');

const http = axios.create({
  baseURL: 'https://dummyapi.io/data/api',
  timeout: 2000,
  headers: {
    'content-type': 'application/json',
    'app-id': '609447084862c654755977c5'
  }
});

// Basic Async Call
http
  .get('user?limit=10')
  .then((resp) => {
    // Perform some action with response data
    console.log(resp.data.data[0]);
    console.log(resp.data.data[1]);
  })
  .catch((error) => {
    // Handle the error scenario
    console.log(error);
  });