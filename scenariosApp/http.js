import 'whatwg-fetch'; /* global fetch: false, Headers: false */

function HttpError(message, status, body, url) {
  this.name = 'HttpError';
  this.message = message || 'There was a server error.';
  this.stack = (new Error()).stack;
  this.status = status;
  this.body = body;
  this.url = url;
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

export function createHeaders(options) {
  const headers = (options.headers) ? options.headers : {
    'Content-Type': 'application/json'
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  return new Headers(headers);
}

const httpStatusToErrorMessages = {
  400: 'HTTP_400_REQUEST_MALFORMED',
  401: 'HTTP_401_AUTHENTICATION_FAILED',
  404: 'HTTP_404_DOES_NOT_EXIST',
  500: 'HTTP_500_SERVER_ERROR'
};

function getErrorDefaultMsg(status) {
  const message = httpStatusToErrorMessages[status];

  if (message) {
    return message;
  }
  return HTTP_DEFAULT_ERROR;
}

function getErrorMessage(data, status) {
  if (!data) {
    return '';
  } else if (data.details) {
    return data.details;
  } else if (data.message) {
    return data.message;
  }
  return getErrorDefaultMsg(status);
}

function convertResponseData(strData) {
  let data;
  try {
    data = JSON.parse(strData);
  } catch (e) {
    data = strData;
  }
  return data;
}

function processHttpError(response) {
  return response.text().then((strData) => {
    const data = convertResponseData(strData);
    const message = getErrorMessage(data, response.status);
    throw new HttpError(message, response.status, data, response.url);
  });
}

export function isJson(contentType) {
  const jsonRegex = /application\/json/;
  return jsonRegex.test(contentType);
}

function responseHandler(response) {
  if (response.status >= 400) {
    return processHttpError(response);
  } else if (!isJson(response.headers.get('Content-Type'))) {
    return response;
  }
  return response.text().then((body) => {
    const data = convertResponseData(body);
    return Promise.resolve(data);
  });
}

function httpFetch(url, method, data, options) {
  const fetchParams = {
    method,
    mode: 'cors',
    headers: createHeaders(options)
  };
  if (data) {
    fetchParams.body = JSON.stringify(data);
  }
  return fetch(url, fetchParams)
    .then(response => responseHandler(response));
}

function get(relativePath, options = {}) {
  return httpFetch(relativePath, 'GET', null, options);
}

function put(relativePath, data, options = {}) {
  return httpFetch(relativePath, 'PUT', data, options);
}

function deleteEntity(relativePath, options = {}) {
  return httpFetch(relativePath, 'DELETE', null, options);
}

function post(relativePath, data, options = {}) {
  return httpFetch(relativePath, 'POST', data, options);
}

export default {
  get,
  put,
  delete: deleteEntity,
  post,
  createHeaders
};