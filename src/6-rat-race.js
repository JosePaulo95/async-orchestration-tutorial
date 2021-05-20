let axios = require('axios');

const http = axios.create({
  baseURL: 'https://www.packtpub.com/in/',
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
});

let cancelTokenSource = null;
//
function getAuthors(keyword) {
  if (cancelTokenSource) {
    cancelTokenSource.cancel(`Request of ${keyword} has cancelled past stale request`);
  }
  cancelTokenSource = axios.CancelToken.source();

  http
    .get(
      `authors/index/result/?page=1&authorName=${keyword}&searchFlag=byname`,
      {
        cancelToken: cancelTokenSource.token
      }
    )
    .then((resp) => {
      // Perform some action with response data
      const authorsList = Object.values(resp.data[0]);
      console.log(`${keyword}: ${authorsList.length}`);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log(`axios message: ${error}`);
      } else {
        // Handle the error scenario
        console.log(error);
      }
    });
}

getAuthors('maxi');
getAuthors('maximi');
getAuthors('max');