import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class Carcas extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.styles = require('./Carcas.less');
  }

  animateToTop() {
    this.clear();
    $(this.container).addClass(this.styles.animateToTop);
  }

  moveToBottom() {
    this.clear();
    $(this.container).addClass(this.styles.moveToBottom);
  }

  animateFromBottom() {
    this.clear();
    $(this.container).addClass(this.styles.animateFromBottom);
  }

  clear() {
    $(this.container)
      .removeClass(this.styles.moveToBottom)
      .removeClass(this.styles.animateFromBottom)
      .removeClass(this.styles.animateToTop);
  }

  render() {
    const { styles } = this;
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
