import React, { Component, PropTypes } from 'react';

export default class Question extends Component {

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    information: PropTypes.string,
    questionsCount: PropTypes.number
  }

  render() {
    const styles = require('./QuestionInformation.less');
    const icons = require('../Styles/icons.less');
    const { id, title, subtitle, information, questionsCount } = this.props;
    const number = parseInt(id, 10) + 1;
    return (
      <div>
        <div className={styles.numbers}>{number} / {questionsCount}</div>
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
