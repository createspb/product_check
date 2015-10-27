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

  animateToTop(callback, timeout = 300) {
    $(this.container).attr('class', [this.styles.containerLeft,
                                     this.styles.animateToTop].join(' '));
    setTimeout(callback, timeout);
  }

  moveToBottom() {
    $(this.container).attr('class', [this.styles.containerLeft,
                                     this.styles.moveToBottom].join(' '));
  }

  animateFromBottom(timeout) {
    setTimeout(() => {
      $(this.container).attr('class', [this.styles.containerLeft,
                                       this.styles.animateFromBottom].join(' '));
    }, timeout);
  }

  bottomToCenter(timeout = 10) {
    this.moveToBottom();
    this.animateFromBottom(timeout);
  }

  render() {
    const { styles } = this;
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.containerRow}>
            <div className={styles.containerCell}>
              <div className={styles.containerRight}>
                <div className={icons.main}></div>
              </div>
              <div
                ref={(ref) => this.container = ref}
                className={styles.containerLeft}
              >
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
