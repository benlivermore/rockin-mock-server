import fs from 'fs';
import ncp from 'ncp';
import log from './log';

const isJsonFileName = /.*\.json/;
const copyDir = ncp.ncp;

function copyDefaultMockResponses(clobber) {
  return new Promise((resolve, reject) => {
    copyDir('./mocks/default', './responses', { clobber }, (err) => {
      if (err) {
        log.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
export function initDefaultMockResponses() {
  return copyDefaultMockResponses(false);
}

export function resetMockResponses() {
  return copyDefaultMockResponses(true);
}

function getResponseFilePath(name) {
  let fileName = name;
  if (!isJsonFileName.test(name)) {
    fileName = `${name}.json`;
  }
  return `./responses/${fileName}`;
}

export function getMockResponseFor(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(getResponseFilePath(name), 'utf8', (err, response) => {
      if (err) {
        log.error(`Mock server does not have a mock response called '${name}'`);
        reject(err);
      }
      let json = {};
      try {
        json = JSON.parse(response);
      } catch (e) {
        log.error(`Can't parse json for response ${name}.`);
        reject(e);
      }
      resolve(json);
    });
  });
}

export function setMockResponse(name, response) {
  return new Promise((resolve, reject) => {
    const filePath = getResponseFilePath(name);
    fs.writeFile(filePath, response, (writeError) => {
      if (writeError) {
        reject(writeError);
      } else {
        resolve(filePath);
      }
    });
  });
}

export default {
  set: setMockResponse,
  get: getMockResponseFor,
  initDefault: initDefaultMockResponses,
  reset: resetMockResponses
};
