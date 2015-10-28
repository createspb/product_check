import React, { Component } from 'react';
import { ResultsCarcas } from '..';

export default class Results extends Component {

  componentDidMount() {
    const { carcas } = this.refs;
    carcas.bottomToCenter();
    // carcas.setBackgroundClass('results');
  }

  render() {
    return (
      <ResultsCarcas ref="carcas">
        <h1>Results</h1>
      </ResultsCarcas>
    );
  }

}
