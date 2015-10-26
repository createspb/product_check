import React, { Component/* , PropTypes */ } from 'react';
import captions from '../../data/captions';

export default class Welcome extends Component {

  render() {
    const { welcome } = captions;
    const styles = require('./Welcome.less');
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.welcome}>
        <h1 className={styles.h1}>{welcome.h1}</h1>
        <div className={styles.company}>
          {welcome.from} <a className={styles.a} href="">{welcome.companyName}</a>
        </div>
        <p className={styles.p}>{welcome.text}</p>
        <button className={styles.button}><i className={icons.go}></i>{welcome.button}</button>
      </div>
    );
  }

}
