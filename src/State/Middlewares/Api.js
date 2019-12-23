import axios from 'axios';
import querystring from 'query-string';

import NavigationService from '../Utils/NavigationService';



const API_ENDPOINT = 'https://mymemorymaker.in/api/';
//const API_ENDPOINT = 'http://192.168.50.66/octeams/admin/index.php';


function buildHeaders(headers) {
 

  return {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    
    ...headers,
  };
}

function request(props) {
  const { url, init, query, option } = props;
  console.log("OPTIONS",props);
  const strQuery = query ? `?${query}` : '';
  const fetchUrl = `${API_ENDPOINT}${url}${strQuery}`;
  console.log("fetch url",fetchUrl);

  return axios({
    url: fetchUrl,
    method: init.method,
    data: option,
    headers: buildHeaders(init.headers),
    timeout: option && option.timeout ? option.timeout : 0,
  })
    .then(response => response)
    .catch(error => {
      if (error.response) {
        if (error.response.status === 403) {
          const user = User.get()[0];
          User.create({ _id: user._id, token: '' }, true);

          NavigationService.navigate('AuthLoading');
        } else {
         
        }
      } else {
        
      }
    });
}

const Api = {
  get: (url, option,query) =>
   
    request({
      url,
      init: {
        method: 'GET'
      },
      option,
      query,
    }),
  post: (url, option,query) =>
    request({
      url,
      init: {
        method: 'POST'
      },
      option,
      query
    }),
  put: (url, option) =>
    request({
      url,
      init: {
        method: 'PUT'
      },
      option,
    }),
};

export default Api;