import React, { Component } from 'react';
import { Carcas } from '..';

export default class ProductName extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
  }

  // static fetchData(getState, dispatch) {
  //   const promises = [];
  //   return Promise.all(promises);
  // }

  render() {
    return (
      <Carcas ref="carcas">
        <h1>Product Name</h1>
      </Carcas>
    );
  }

}
