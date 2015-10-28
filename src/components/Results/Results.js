import React, { Component, PropTypes } from 'react';
import { ResultsCarcas, Matrix } from '..';
import { connect } from 'react-redux';
import {
  isLoaded as isLoadedQuestions,
  load as loadQuestions } from 'redux/modules/questions';
import {
  isLoaded as isLoadedMatrix,
  load as loadMatrix } from 'redux/modules/matrix';
import { pushState } from 'redux-router';
import captions from '../../data/captions';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers
  }),
  {pushState, isLoadedQuestions, loadQuestions, isLoadedMatrix, loadMatrix})
export default class Results extends Component {

  static propTypes = {
    questions: PropTypes.object,
    answers: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    // check hasLostAnswers
    // if (this.hasLostAnswers()) {
    //   this.props.pushState(null, '/');
    // }
  }

  componentDidMount() {
    const { carcas } = this.refs;
    carcas.bottomToCenter();
  }

  hasLostAnswers() {
    return !this.props.answers
       || Object.keys(this.props.answers).length < this.props.questions.count;
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isLoadedQuestions(getState())) {
      promises.push(dispatch(loadQuestions()));
    }
    if (!isLoadedMatrix(getState())) {
      promises.push(dispatch(loadMatrix()));
    }
    return Promise.all(promises);
  }

  renderArticleButton(styles, icons, results) {
    return (
      <a
        href="http://createdigital.me/blog/2015/10/19/matrica-cifrovogo-produkta-vvodnaya/"
        target="_blamk"
        className={styles.article}
      >
        <i className={icons.matrix}></i>
        <div className={styles.articleData}>
          <div className={styles.articleTitle}>
            {results.articleTitle}
          </div>
          <div className={styles.articleDescription}>
            {results.articleDescription}
          </div>
        </div>
      </a>
    );
  }

  renderNext(styles, icons, results) {
    return (
      <div className={styles.next}>
        <h1 className={styles.h1}>
          <i className={icons.next}></i>
          {results.nextH1}
        </h1>
        <div className={styles.left}>
          <p className={styles.p}>{results.nextLeft}</p>
          {this.renderArticleButton(styles, icons, results)}
        </div>
        <div className={styles.right}>
          <p className={styles.p}>{results.nextRight}</p>
          <ul className={styles.social}>
            <li><a href="" target="_blank"><i className={icons.fb}></i></a></li>
            <li><a href="" target="_blank"><i className={icons.vk}></i></a></li>
            <li><a href="" target="_blank"><i className={icons.tw}></i></a></li>
          </ul>
          <div className={styles.company}>
            {results.from}
            <a
              className={styles.a}
              target="_blank"
              href="http://createdigital.me/"
            >{results.companyName}</a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const styles = require('./Results.less');
    const icons = require('../Styles/icons.less');
    const { results } = captions;
    return (
      <ResultsCarcas ref="carcas">
        <div className={styles.matrix}>
          <h1 className={styles.h1}>
            <i className={icons.results}></i>
            {results.h1}
          </h1>
          <p className={styles.p}>{results.p}</p>
          <Matrix />
        </div>
        {this.renderNext(styles, icons, results)}
      </ResultsCarcas>
    );
  }

}
