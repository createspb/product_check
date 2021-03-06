import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Carcas } from '..';
import captions from '../../data/captions';

@connect(
  state => ({questions: state.questions.questions}),
  {pushState})
export default class Warning extends React.Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
    if (window) {
      ga('send', 'event', 'warning'); // eslint-disable-line
    }
  }

  handleButton(event) {
    event.stopPropagation();
    this.refs.carcas.animateToTop(
      () => this.props.pushState(null, '/questions/1')
    );
  }

  render() {
    const styles = require('./Warning.less');
    const icons = require('../Styles/icons.less');
    const { label, p, p1, button, info } = captions.warning;
    return (
      <Carcas ref="carcas">
        <h2 className={styles.h2}>
          <i className={icons.warningWhite}></i>
          <span dangerouslySetInnerHTML={{__html: label}} />
        </h2>
        <p className={styles.p} dangerouslySetInnerHTML={{__html: p}} />
        <p className={styles.p} dangerouslySetInnerHTML={{__html: p1}} />
        <div className={styles.info}>
          <i className={icons.info}></i>
          <span dangerouslySetInnerHTML={{__html: info}} />
        </div>
        <button
          onClick={::this.handleButton}
          className={styles.transparentButton}
        >{button}</button>
      </Carcas>
    );
  }

}
