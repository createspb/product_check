import React, { Component, PropTypes } from 'react';

export default class Home extends Component {

  static propTypes = {
    params: PropTypes.object,
    children: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    const styles = require('./Home.less');
    return (
      <div className={styles.home}>
        {children}
      </div>
    );
  }

}
