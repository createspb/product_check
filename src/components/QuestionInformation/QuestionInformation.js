import React, { Component, PropTypes } from 'react';

export default class Question extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    information: PropTypes.string
  }

  render() {
    const styles = require('./QuestionInformation.less');
    const icons = require('../Styles/icons.less');
    const { title, subtitle, information } = this.props;
    return (
      <div>
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
