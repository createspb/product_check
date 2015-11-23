import React, { Component } from 'react';
// import MobileDetect from 'mobile-detect';

export default class Mobile extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (window) {
      ga('send', 'event', 'mobile'); // eslint-disable-line
    }
  }

  render() {
    const icons = require('../Styles/icons.less');
    const styles = require('./Mobile.less');
    return (
      <div className={styles.wrapper}>
        <div className={[icons.main, styles.icon].join(' ')}></div>
        <div className={styles.textWrapper}>
          <h2 className={styles.h2}>Добрый день!</h2>
          <p className={styles.p}>К сожалению, возможность пройти тест на планшетах/смартфонах не реализована.</p>
          <p className={styles.p}>Пожалуйста, воспользуйтесь десктопным браузером.</p>
        </div>
      </div>
    );
  }

}
