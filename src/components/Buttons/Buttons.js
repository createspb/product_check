import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';

export default class Buttons extends Component {

  static propTypes = {
    handleYes: PropTypes.func.isRequired,
    handleNo: PropTypes.func.isRequired,
    answer: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state.answer = props.answer;
  }

  state = {
    answer: undefined
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      answer: nextProps.answer
    });
  }

  handleYes(event) {
    event.stopPropagation();
    this.props.handleYes(1);
  }
  handleNo(event) {
    event.stopPropagation();
    this.props.handleNo(0);
  }

  renderButton(handler, caption, active, styles, icons) {
    const i = active ? 0 : 1;
    // if (active) {
    //   i = 0;
    // } else {
    //   i = 1;
    // }
    return (
      <button
        onClick={handler}
        className={styles[i]}
      >
        <i className={icons[i]}></i>
        {caption}
      </button>
    );
  }

  render() {
    let yesActive = false;
    let noActive = false;
    if (this.state.answer && this.state.answer.value) {
      noActive = this.state.answer.value === 'no';
      yesActive = this.state.answer.value === 'yes';
    }
    const { questionCaptions } = captions;
    const styles = require('./Buttons.less');
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.buttons}>
        {this.renderButton(
          ::this.handleYes,
          questionCaptions.yes,
          yesActive,
          [styles.button, styles.transparentButton],
          [icons.yesActive, icons.yes]
        )}
        {this.renderButton(
          ::this.handleNo,
          questionCaptions.no,
          noActive,
          [styles.button, styles.transparentButton],
          [icons.noActive, icons.no]
        )}
      </div>
    );
  }
}
