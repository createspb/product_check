import React, { Component, PropTypes } from 'react';

export default class Carcas extends Component {
  static propTypes = {
    children: PropTypes.any
  };
  render() {
    const styles = require('./Carcas.less');
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.container}>
        <div className={styles.containerRow}>
          <div className={styles.containerCell}>
            <div className={styles.containerRight}>
              <div className={icons.main}></div>
            </div>
            <div className={styles.containerLeft}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
