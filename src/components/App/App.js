import React, { Component, PropTypes } from 'react';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    const reset = require('../Styles/reset.less');
    console.log('Step1');
    return (
      <div className={reset.app}>
        {this.props.children}
      </div>
    );
  }

}
