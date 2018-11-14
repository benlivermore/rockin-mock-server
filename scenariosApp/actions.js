import http from './http';

function get(options) {
  return (dispatch) => {
    http.get('http://localhost:8888/scenarios').then((scenarios) => {
      console.log(scenarios);
    });
  }
} 

function runScenario(name, options) {
  return (dispatch) => {
    http.post('http://localhost:8888/scenarios', { scenarios: [name] }, options);
  }
}

function clearScenarios(options = {}) {
  return (dispatch) => {
    http.delete('http://localhost:8888/scenarios', options).then((data) =>{
      dispatch({
        type: 'clearScenarios.SUCCESSFUL',
        data
      })
    });
  }
}

export const getScenarios = (options) => {
  return (dispatch) => {
    http.get('http://localhost:8888/scenarios').then((data) => {
      dispatch({
        type: 'getScenarios.SUCCESSFUL',
        data
      })
    });
  }
}

export default {
  getScenarios,
  runScenario,
  clearScenarios
};
