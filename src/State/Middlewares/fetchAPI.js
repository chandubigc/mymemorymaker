import axios from 'axios';
import querystring from 'query-string';

const API_ENDPOINT = 'http://ec2-13-233-245-178.ap-south-1.compute.amazonaws.com/admin/index.php';


function buildHeaders (headers) {
  console.log ('HEADERS -- >', headers);
  if (!headers || !headers['Content-Type']) {
    if (!headers) headers = {};

    headers['Content-Type'] = 'application/json';
  }
  console.log (headers);
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };
}

function request (props) {
  const {url, init, query, option, isSystem} = props;
  console.log("props",props);
  let strQuery = query ? `?${query}` : '';
  let fetchUrl = url;
  if (isSystem) fetchUrl = `${API_ENDPOINT}${url}${strQuery}`;
  console.log ('55555',fetchUrl);
  if(init.method == 'GET'){
    return fetch (fetchUrl, {
      method: init.method,
      headers: buildHeaders (init.headers),
      
    })
      .then (response => response.json())
      .catch (e => Promise.reject (e));
  }else{
  return fetch (fetchUrl, {
    method: init.method,
    headers: buildHeaders (init.headers),
    body: JSON.stringify(option),
  })
    .then (response => response.json())
    .catch (e => Promise.reject (e));
}
}

const fetchAPI = {
  get: (url, option, headers,query, isSystem = true) => {
    console.log (headers);
    return request ({
      url,
      init: {
        method: 'GET',
        headers: headers,
      },

      option,
      query,
      isSystem: isSystem,
    });
  },
  post: (url, option, headers,query, isSystem = true) => {
    console.log ('FFFF', isSystem);
    return request ({
      url,
      init: {
        method: 'POST',
        headers: headers,
      },
      option,
      query,
      isSystem: isSystem,
    });
  },
  put: (url, option) => {
    return request ({
      url,
      init: {
        method: 'PUT',
      },
      option,
    });
  },
};

export default fetchAPI;
