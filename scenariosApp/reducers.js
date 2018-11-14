export const initialScenariosState = {
  list: [],
  cleared: false
};

export function session(state = {}, action) {
  return state;
}

export function scenarios(state = initialScenariosState, action) {
  let newState = state;
  switch(action.type){
    case 'getScenarios.SUCCESSFUL':
      newState = Object.assign({}, state, {
        list: action.data,
        cleared: false
      });
      break;
    case 'clearScenarios.SUCCESSFUL':
      newState = Object.assign({}, state, {
        cleared: true
      });
      break;
    default:
      newState = state;
  }

  return newState;
}

const reducers = {
  session,
  scenarios
};

export default reducers;
