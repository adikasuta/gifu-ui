import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = process.env.VUE_APP_BACKEND_BASE_URL || 'http://localhost:3000'
const METHOD = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PATCH: "patch",
  PUT: "put"
};

const DEFAULT_RESPONSE_FORMATTER = response => {
  let result = response.data;
  if (result && result.data !== undefined) {
    result = result.data;
  }

  return result;
};

export default {
  get(url, params, headers, responseFormatter) {
    return call(METHOD.GET, url, params, null, headers, responseFormatter);
  },
  post(url, params, data, headers) {
    return call(METHOD.POST, url, params, data, headers);
  },
  delete(url) {
    return call(METHOD.DELETE, url, null, null, null);
  },
  patch(url, params, data, headers) {
    return call(METHOD.PATCH, url, params, data, headers);
  },
  put(url, params, data, headers) {
    return call(METHOD.PUT, url, params, data, headers);
  }
};

function call(
  method,
  url,
  params,
  data,
  headers,
  formatResponse = DEFAULT_RESPONSE_FORMATTER
) {
  return new Promise((resolve, reject) => {
    const token = Cookies.get('BEARER');
    const defaultHeader = {};
    if(token){
      defaultHeader['Authorization'] = 'Bearer '+token;
    }
    axios({
      url: `${BASE_URL}${url}`,
      method,
      data,
      params,

      // Options
      headers: {
        ...headers,
        ...defaultHeader
      },
      withCredentials: true,
      crossDomain: true
    })
      .then(response => {
        let formattedResponse = formatResponse(response);

        resolve(formattedResponse);
      })
      .catch(error => {
        reject(error);
      });
  });
}
