import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './actions';


class ScenarioItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.name);
  }
  render(){
    return (
      <li>{this.props.name}<button onClick={this.handleClick}>Run</button></li>
    );
  }
}

export class ListBase extends Component {
  componentWillMount() {
    this.props.getScenarios();
  }

  render(){
    const { runScenario, scenarios, clearScenarios } = this.props;
    return (
      <div>
        <h2>Scenarios</h2>
        <p>Click "run" to turn on any scenario.</p>
        <ul>
          {
            scenarios.map(scenario => (
              <ScenarioItem
                name={scenario}
                onClick={runScenario}
              />
            ))
          }
        </ul>
        <button onClick={clearScenarios}>Reset mock server to defaults</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scenarios: state.scenarios.list
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBase);
