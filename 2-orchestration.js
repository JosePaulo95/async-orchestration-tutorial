var axios = require('axios');

const http = axios.create({
  baseURL: 'https://dummyapi.io/data/api',
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
    'app-id': '609447084862c654755977c5'
  }
});

// Orchestration
async function getFirstUserInfo() {
  try {
    let usersListResp = await http.get('user?limit=10');

    // Get the first user id
    let user = usersListResp.data.data[0];
    console.log('user: ', user);

    // Get the user full information
    // Make a second (or subsequent) sequential API calls
    let userInfoResp = await http.get(`user/${user.id}`);
    let userInfo = userInfoResp.data;
    console.log('userInfo: ', userInfo);

    //
  } catch (error) {
    // Handle the error scenario
    console.log(error);
  }
}

getFirstUserInfo();