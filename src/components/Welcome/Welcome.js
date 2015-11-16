import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';
import { isLoaded, load } from 'redux/modules/questions';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import { Carcas } from '..';

@connect(
  state => ({questions: state.questions.questions}),
  {pushState, isLoaded, load})
export default class Welcome extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
  }

  handleButton(event) {
    event.stopPropagation();
    this.refs.carcas.animateToTop(
      () => this.props.pushState(null, '/warning')
    );
  }

  handleExternalLink(event) {
    ga('send', 'event', 'externalLink', $(event.currentTarget).attr('href')); // eslint-disable-line
  }

  static fetchData(getState, dispatch) {
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
  }


  render() {
    const { welcome } = captions;
    const styles = require('./Welcome.less');
    const icons = require('../Styles/icons.less');
    return (
      <Carcas ref="carcas">
        <h1 className={styles.h1}>{welcome.h1}</h1>
        <div className={styles.company}>
          {welcome.from}
          <a
            className={styles.a}
            target="_blank"
            href="http://createdigital.me/"
            onClick={::this.handleExternalLink}
          >{welcome.companyName}</a>
          {welcome.and}
          <a
            className={styles.a}
            target="_blank"
            href="http://digitalchange.me/"
            onClick={::this.handleExternalLink}
          >{welcome.companyPartner}</a>
        </div>
        <p
          className={styles.p}
          dangerouslySetInnerHTML={{__html: welcome.text}}
        />
        <button onClick={::this.handleButton} className={styles.button}>
          <i className={icons.go}></i>
          {welcome.button}
        </button>
      </Carcas>
    );
  }

}
