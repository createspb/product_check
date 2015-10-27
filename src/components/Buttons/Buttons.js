import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';

export default class Buttons extends Component {

  static propTypes = {
    handleYes: PropTypes.func.isRequired,
    handleNo: PropTypes.func.isRequired
  }

  handleYes(event) {
    event.stopPropagation();
    this.props.handleYes(1);
  }
  handleNo(event) {
    event.stopPropagation();
    this.props.handleNo(0);
  }

  render() {
    // const { handleYes, handleNo } = this.props;
    const { questionCaptions } = captions;
    const styles = require('./Buttons.less');
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.buttons}>
        <button
          onClick={::this.handleYes}
          className={styles.transparentButton}
        >
          <i className={icons.yes}></i>
          {questionCaptions.yes}
        </button>
        <button
          onClick={::this.handleNo}
          className={styles.transparentButton}
        >
          <i className={icons.no}></i>
          {questionCaptions.no}
        </button>
      </div>
    );
  }
}
