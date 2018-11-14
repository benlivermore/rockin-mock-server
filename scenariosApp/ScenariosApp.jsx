import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import ScenariosList from './ScenariosList'
export default function App() {
  return (
    <Provider store={store}>
      <ScenariosList />
    </Provider>
  );
}
