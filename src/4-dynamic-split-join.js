var axios = require('axios');

const http = axios.create({
  baseURL: 'https://dummyapi.io/data/api',
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
    'app-id': '609447084862c654755977c5'
  }
});

// Get posts list created by user
// Create a correlation
function getUserPosts(userId){
    return new Promise((resolve, reject) => {
        http
            .get(`user/${userId}/post`)
            .then((resp) => {
                resolve({"correlationId": userId, ...resp.data});
            }).catch((error) => {
                reject(error)
            })
    })
}

// Dynamic Split-join
async function getAllUsersPost() {
  let usersListResp = await http.get('user?limit=10');

  // Pick only two users for demo sake
  let usersList = [usersListResp.data.data[0], usersListResp.data.data[2]];
  let userPostsPromises = usersList.map((user) => getUserPosts(user.id));

  return Promise.all(userPostsPromises)
    .then((userPostsResp) => {
      userPostsResp.forEach((resp) => {
        let userPosts = resp;
        console.log(
          `No of posts for user ${userPosts.correlationId} ${userPosts.data.length}`
        );
      });
    })
    .catch((error) => {
      // Handle error scenarios
      console.log(error);
    });
}

getAllUsersPost();