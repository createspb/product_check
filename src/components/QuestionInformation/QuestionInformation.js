import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class Question extends Component {

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    information: PropTypes.string,
    firstOfType: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    questionsCount: PropTypes.number,
    back: PropTypes.any,
    next: PropTypes.any,
    handleBack: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  getDotOffsetTop() {
    return $(this.refs.numbers);
  }

  handleBack(event) {
    event.stopPropagation();
    this.props.handleBack();
  }

  handleNext(event) {
    event.stopPropagation();
    this.props.handleNext();
  }

  renderLabel(styles, icons) {
    if (!this.props.firstOfType) return false;
    return (
      <div className={styles.firstOfType} style={{color: this.props.color}}>
        <i className={icons[this.props.icon]}></i>
        {this.props.firstOfType}
      </div>
    );
  }

  renderBack(styles, icons) {
    const { back } = this.props;
    if (!back) return false;
    return (
      <div
        ref="back"
        onClick={::this.handleBack}
        className={styles.back}
      >
        <i className={icons.topstr}></i>
      </div>
    );
  }

  renderNext(styles, icons) {
    const { next } = this.props;
    if (!next) {
      return (
        <div
          ref="next"
          className={[styles.next, styles.nextPassive].join(' ')}
        >
          <i className={icons.botstr}></i>
        </div>
      );
    }
    return (
      <div
        ref="next"
        onClick={::this.handleNext}
        className={styles.next}
      >
        <i className={icons.botstr}></i>
      </div>
    );
  }

  render() {
    const styles = require('./QuestionInformation.less');
    const icons = require('../Styles/icons.less');
    const { id, title, subtitle, information, questionsCount } = this.props;
    const number = parseInt(id, 10) + 1;
    return (
      <div>
        {this.renderLabel(styles, icons)}
        <div ref="numbers" className={styles.numbers}>
          {this.renderBack(styles, icons)}
          {this.renderNext(styles, icons)}
          {number} / {questionsCount}
          <b ref="dot" style={{background: this.props.color}}></b>
        </div>
        <div className={styles.h2}>{title}</div>
        <p className={styles.p}>{subtitle}</p>
        {information &&
          <div className={styles.info}>
            <i className={icons.info}></i>
            {information}
          </div>
        }
      </div>
    );
  }

}
