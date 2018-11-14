import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import morgan from 'morgan';
import React from 'react';
import path from 'path';
import { haltOnTimedout, noCache } from './helpers';
import mockResponse from './mockResponse';
import scenariosHandler from './scenariosHandler';
import Mock from './mock';
import HTTP from './httpCodes';
import homeTemplate from './index.html';

export function App({ appName, port, host, scenariosAppPath }) {
  const app = express();
  const homeHtml = homeTemplate.replace(/{{appName}}/g, appName);
  app.use(timeout('10s'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(noCache);
  app.use(haltOnTimedout);
  app.use(morgan('tiny'));
  app.use('/scenarios', scenariosHandler());
  app.get('/', (req, res) => {
    res.send(homeHtml);
  });
  app.get('/scenariosApp.js', (req, res) => {
    res.sendFile(path.resolve(scenariosAppPath));
  });

  return {
    use: app.use.bind(app),
    get: app.get.bind(app),
    post: app.post.bind(app),
    put: app.put.bind(app),
    delete: app.delete.bind(app),

    start: () => {
      mockResponse.initDefault();

      app.listen(port, host, () => {
        console.log(`${appName} is running on HOST: ${host} and PORT: ${port}`); // eslint-disable-line
      });
    }
  };
}

export function Router() {
  return express.Router();
}

export {
  Mock,
  HTTP
};

export default App;
