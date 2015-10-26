import React, { Component, PropTypes } from 'react';
import jQuery from 'jquery';

export default class Carcas extends Component {
  static propTypes = {
    children: PropTypes.any
  };
  animateToTop() {
    const styles = require('./Carcas.less');
    jQuery(this.container)
      .removeClass(styles.moveToBottom)
      .removeClass(styles.animateFromBottom)
      .removeClass(styles.animateToTop)
      .addClass(styles.animateToTop);
  }
  moveToBottom() {
    const styles = require('./Carcas.less');
    jQuery(this.container)
    .removeClass(styles.moveToBottom)
    .removeClass(styles.animateFromBottom)
    .removeClass(styles.animateToTop)
      .addClass(styles.moveToBottom);
  }
  animateFromBottom() {
    const styles = require('./Carcas.less');
    jQuery(this.container)
      .removeClass(styles.moveToBottom)
      .removeClass(styles.animateFromBottom)
      .removeClass(styles.animateToTop)
      .addClass(styles.animateFromBottom);
  }
  clear() {
    const styles = require('./Carcas.less');
    jQuery(this.container).removeClass(styles.animateToTop);
  }
  render() {
    const styles = require('./Carcas.less');
    const icons = require('../Styles/icons.less');
    return (
      <div ref={(ref) => this.container = ref} className={styles.container}>
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
