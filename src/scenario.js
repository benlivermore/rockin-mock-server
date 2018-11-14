import fs from 'fs';
import path from 'path';
import merge from 'lodash.merge';
import mockResponse from './mockResponse';

const SCENARIOS_DIRECTORY = './mocks/scenarios';

function jsonStr(json) {
  return JSON.stringify(json, null, 2);
}

function getNewResponse(scenario, responseFile) {
  return new Promise((resolve) => {
    if (scenario.type !== 'merge') {
      resolve(jsonStr(scenario.response));
    } else {
      mockResponse.get(responseFile).then((currentResponse) => {
        const newResponse = merge(currentResponse, scenario.response);
        resolve(jsonStr(newResponse));
      });
    }
  });
}

function applyScenarioResponse(scenarioDir, file) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${scenarioDir}/${file}`, 'utf8', (err, scenarioStr) => {
      const scenario = JSON.parse(scenarioStr);

      getNewResponse(scenario, file).then((response) => {
        mockResponse.set(file, response)
          .then(resolve)
          .catch(reject);
      });
    });
  });
}

function getDirectories(dirPath, names) {
  return names.filter(name => fs.lstatSync(path.join(dirPath, name)).isDirectory());
}

export function getScenarios() {
  return new Promise((resolve, reject) => {
    fs.readdir(SCENARIOS_DIRECTORY, (err, contents) => {
      if (err) {
        return reject(err);
      }

      resolve(getDirectories(SCENARIOS_DIRECTORY, contents));
    });
  });
}

export function setScenario(name) {
  const scenarioDir = `${SCENARIOS_DIRECTORY}/${name}`;
  return new Promise((resolve, reject) => {
    fs.readdir(scenarioDir, (err, files) => {
      if (err) {
        reject(err);
      }

      const allScenarioResponses = files.map(file =>
        applyScenarioResponse(scenarioDir, file)
      );
      Promise.all(allScenarioResponses).then(resolve);
    });
  });
}

export function setScenarios(scenarios) {
  let sequence = Promise.resolve();
  scenarios.forEach((name) => {
    sequence = sequence.then(() => setScenario(name));
  });
  return sequence;
}

function clearScenarios() {
  return mockResponse.reset();
}

export default {
  set: setScenarios,
  get: getScenarios,
  clear: clearScenarios
};
