import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);
const loggerMiddleware = createLogger();
const middlewares = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

let enhancers = middlewares;

const store = createStore(rootReducer, enhancers);

export default store;
