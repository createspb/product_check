import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class Carcas extends Component {

  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.styles = require('./Carcas.less');
    this.backgroundClass = this.styles.c0;
  }

  setBackgroundClass(className) {
    $(this.refs.bgLayer1).css({
      opacity: 0
    }).attr('class', [this.styles.background,
                      this.styles['c' + className]].join(' ')
    ).animate({
      opacity: 1
    }, 300, () => {
      $(this.refs.bgLayer0)
        .attr('class', [this.styles.background,
                        this.styles['c' + className]].join(' '));
    });
  }

  setLineColor(color, timeout) {
    setTimeout(() => {
      $(this.refs.line).css({
        background: color
      });
    }, timeout);
  }

  animateToTop(callback, timeout = 300) {
    this.showTopOfLine();
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

  showLine() {
    setTimeout(() => {
      $(this.refs.line).addClass(this.styles.activeLine);
    }, 200);
  }

  hideTopOfLine() {
    $(this.refs.line).addClass(this.styles.htol);
  }

  showTopOfLine() {
    $(this.refs.line).removeClass(this.styles.htol);
  }

  hideBottomOfLine() {
    $(this.refs.line).addClass(this.styles.hbol);
  }

  showBottomOfLine() {
    $(this.refs.line).removeClass(this.styles.hbol);
  }

  render() {
    const { styles } = this;
    const icons = require('../Styles/icons.less');
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>

        <div
          ref="bgLayer0"
          className={[styles.background, this.backgroundClass].join(' ')}
        ></div>
        <div ref="bgLayer1" className={styles.background}></div>

        <div ref="line" className={styles.line}></div>

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
                {children}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}
