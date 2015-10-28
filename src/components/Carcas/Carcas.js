import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class Carcas extends Component {

  static propTypes = {
    children: PropTypes.any,
    full: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.styles = require('./Carcas.less');
    this.backgroundClass = this.styles.c0;
    this.wrapClass = this.styles.containerLeft;
  }

  // Animations
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

  setContainerClass(className, timeout = false) {
    if (timeout) {
      setTimeout(() => {
        $(this.container).attr('class', [this.wrapClass,
                                         className].join(' '));
      }, timeout);
    } else {
      $(this.container).attr('class', [this.wrapClass,
                                       className].join(' '));
    }
  }

  animateToTop(callback, timeout = 300) {
    this.showTopOfLine();
    this.setContainerClass(this.styles.animateToTop);
    setTimeout(callback, timeout);
  }

  animateToBottom(callback, timeout = 300) {
    this.showBottomOfLine();
    this.setContainerClass(this.styles.animateToBottom);
    setTimeout(callback, timeout);
  }

  bottomToCenter(timeout = 10) {
    this.setContainerClass(this.styles.moveToBottom);
    this.setContainerClass(this.styles.animateFromBottom, timeout);
  }

  topToCenter(timeout = 10) {
    this.setContainerClass(this.styles.moveToTop);
    this.setContainerClass(this.styles.animateFromTop, timeout);
  }

  // Left line animations
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

  renderBackgrounds(styles) {
    return (
      <div>
        <div
          ref="bgLayer0"
          className={[styles.background, this.backgroundClass].join(' ')}
        ></div>
        <div ref="bgLayer1" className={styles.background}></div>
        <div ref="line" className={styles.line}></div>
      </div>
    );
  }

  renderCell(styles, icons, children) {
    return (
      <div className={styles.containerCell}>
        <div className={styles.containerRight}>
          <div className={icons.main}></div>
        </div>
        <div
          ref={(ref) => this.container = ref}
          className={this.wrapClass}
        >
          {children}
        </div>
      </div>
    );
  }

  render() {
    const { styles } = this;
    const icons = require('../Styles/icons.less');
    const { children } = this.props;
    return (
      <div className={styles.wrapper}>
        {this.renderBackgrounds(styles)}
        <div className={styles.container}>
          <div className={styles.containerRow}>
            {this.renderCell(styles, icons, children)}
          </div>
        </div>
      </div>
    );
  }

}
