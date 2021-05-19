var axios = require('axios');

const http = axios.create({
  baseURL: 'https://dummyapi.io/data/api',
  timeout: 5000,
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
    
  let usersListResp = await http.get('user?limit=12');//pega 12 usuarios
  let usersList = usersListResp.data.data;

  //Pick users in batches of 3
  while(usersList.length > 0){
    let batch = usersList.splice(0,3)
    let userPostsPromises = batch.map((user) => getUserPosts(user.id));

    await Promise.all(userPostsPromises)
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
}

getAllUsersPost()
