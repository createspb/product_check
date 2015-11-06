import React, { PropTypes } from 'react';
import { Carcas } from '..';
import {
  isLoaded as isLoadedQuestions,
  load as loadQuestions } from 'redux/modules/questions';
import {
  isLoaded as isLoadedAnswers,
  load as loadAnswers } from 'redux/modules/answers';
import captions, { declOfNum } from '../../data/captions';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import _ from 'underscore';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers
  }),
  { pushState, isLoadedQuestions, loadQuestions, isLoadedAnswers, loadAnswers })
export default class Subresults extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    questions: PropTypes.object,
    answers: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
  }

  handleButton(event) {
    event.stopPropagation();
    this.refs.carcas.animateToTop(
      () => this.props.pushState(null, '/questions/' + this.nextQuestionId())
    );
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isLoadedQuestions(getState())) {
      promises.push(dispatch(loadQuestions()));
    }
    if (!isLoadedAnswers(getState())) {
      promises.push(dispatch(loadAnswers()));
    }
    return Promise.all(promises);
  }

  countQuestions() {
    return parseInt(this.props.questions.count, 10);
  }

  nextQuestionId() {
    return parseInt(this.props.params.questionId, 10);
  }

  prevQuestionId() {
    return this.nextQuestionId() - 1;
  }

  countLeftQuestions() {
    return this.countQuestions() - this.prevQuestionId();
  }

  blockAnswers() {
    const prev = this.prevQuestionId();
    /* let i = prev - 1;
    let t = 0;
    while (i) {
      if (this.props.questions[i].firstOfType) {
        t = i;
        i = false;
      } else {
        i -= 1;
      }
    } */
    return _.filter(this.props.answers.answers, (e) => {
      return e.id < prev/* && e.id >= t*/;
    });
  }

  blockAnswersYes() {
    return _.where(this.blockAnswers(), {value: 'yes'});
  }

  countYesBlockQuestions() {
    return _.size(this.blockAnswersYes());
  }

  subresult() {
    const countYes = this.countYesBlockQuestions();
    const subresults = this.props.questions.subresults[this.nextQuestionId()];
    return _.filter(subresults, (e, k) => {
      return countYes <= parseInt(k, 10);
    })[0];
  }

  render() {
    const leftQuestions = this.countLeftQuestions();
    const styles = require('./Subresults.less');
    const { label, button, other, q, fr } = captions.subresults;
    const ps = this.subresult();
    return (
      <Carcas ref="carcas">
        <h2 className={styles.h2}>
          {label}
          <span className={styles.span}>
            {this.countYesBlockQuestions()} {fr} {_.size(this.blockAnswers())}
          </span>
        </h2>
        {_.map(ps, (e, k) => {
          return (
            <p className={styles.p} key={k}>{e}</p>
          );
        })}
        <div className={styles.buttons}>
          <button
            onClick={::this.handleButton}
            className={styles.transparentButton}
          >{button}</button>
          <span className={styles.count}>
            {other} {leftQuestions} {declOfNum(leftQuestions, q)}
          </span>
        </div>
      </Carcas>
    );
  }
}
