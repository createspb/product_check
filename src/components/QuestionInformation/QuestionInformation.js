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
    handleBack: PropTypes.func.isRequired
  }

  getDotOffsetTop() {
    return $(this.refs.numbers);
  }

  handleBack(event) {
    event.stopPropagation();
    this.props.handleBack();
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

  render() {
    const styles = require('./QuestionInformation.less');
    const icons = require('../Styles/icons.less');
    const { id, title, subtitle, information, questionsCount, back } = this.props;
    console.log(back);
    const number = parseInt(id, 10) + 1;
    return (
      <div>
        {this.renderLabel(styles, icons)}
        <div ref="numbers" className={styles.numbers}>
          {number} / {questionsCount}
          <i ref="dot" style={{background: this.props.color}}></i>
        </div>
        <div className={styles.h2}>{title}</div>
        <p className={styles.p}>{subtitle}</p>
        {information &&
          <div className={styles.info}>
            <i className={icons.info}></i>
            {information}
          </div>
        }
        {back &&
          <div
            ref="back"
            onClick={::this.handleBack}
            className={styles.back}
            style={{background: this.props.color}}
          >
            <i className={icons.top}></i>
          </div>
        }
      </div>
    );
  }

}
