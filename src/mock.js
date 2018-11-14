import httpCodes from './httpCodes';
import { asyncWrapper } from './helpers';
import log from './log';
import mockResponse from './mockResponse';

const mockEndPointDefaults = {
  status: httpCodes.OK,
  delay: 100
};

export default function Mock(name, options = {}) {
  return (req, res) => {
    mockResponse.get(name).then((response) => {
      const status = response.status || options.status || mockEndPointDefaults.status;
      const delay = response.delay || mockEndPointDefaults.delay;
      let body = response.body;

      if (response.update) {
        body = Object.assign({}, body, req.body);
      }
      return asyncWrapper(
        () => res.status(status).json(body),
        delay
      );
    }).catch((error) => {
      log.error(error);
    });
  };
}

Mock.Get = function Get(name) {
  return Mock(name);
};

Mock.Put = function Put(name) {
  return Mock(name);
};

Mock.Post = function Post(name) {
  return Mock(name, {
    status: httpCodes.CREATED
  });
};

Mock.Delete = function Delete(name) {
  return Mock(name);
};
