var axios = require('axios');

const http = axios.create({
  baseURL: 'https://dummyapi.io/data/api',
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
    'app-id': '609447084862c654755977c5'
  }
});

// Get user full profile
function getUserInfo(userId) {
  let userInfoPromise = http.get(`user/${userId}`);
  return userInfoPromise;
}

// Get posts list created by user
function getUserPosts(userId) {
  let userPostPromise = http.get(`user/${userId}/post`);
  return userPostPromise;
}

// Split-join with fail-fast
function getUserDetails(userId) {
  return Promise.all([getUserInfo(userId), getUserPosts(userId)])
    .then(([userInfoResp, userPostsResp]) => {
      const userInfo = userInfoResp.data;
      const userPosts = userPostsResp.data;
      console.log(userInfo, userPosts);
    })
    .catch((error) => {
      console.log(error);
    });
}

const userId = '0F8JIqi4zwvb77FGz6Wt';
getUserDetails(userId);