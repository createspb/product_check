import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';
import { isLoaded, load } from 'redux/modules/questions';

import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => ({questions: state.questions.data}),
  {pushState, isLoaded, load})
export default class Question extends Component {

  static propTypes = {
    params: PropTypes.object,
    questions: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      questionId: nextProps.params.questionId
    });
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(load()));
    }
    return Promise.all(promises);
  }

  handleButton(event) {
    event.stopPropagation();
    const { questionId } = this.props.params;
    const next = parseInt(questionId, 10) + 1;
    if (next - 1 < this.props.questions.count) {
      this.props.pushState(null, '/questions/' + next);
    }
  }

  render() {
    const { questionCaptions } = captions;
    const { questionId } = this.props.params;
    const question = this.props.questions[questionId - 1];
    const styles = require('./Question.less');
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.question}>
        <div className={styles.container}>
          <div className={styles.containerRow}>
            <div className={styles.containerCell}>
              <div className={styles.containerRight}>
                <div className={icons.main}></div>
              </div>
              <div className={styles.containerLeft}>
                <div className={styles.h2}>{question.title}</div>
                <p className={styles.p}>{question.subtitle}</p>
                {question.information &&
                  <div className={styles.info}>
                    <i className={icons.info}></i>
                    {question.information}
                  </div>
                }
                <div className={styles.buttons}>
                  <button
                    onClick={::this.handleButton}
                    className={styles.transparentButton}
                  >
                    <i className={icons.yes}></i>
                    {questionCaptions.yes}
                  </button>
                  <button
                    onClick={::this.handleButton}
                    className={styles.button}
                  >
                    <i className={icons.no}></i>
                    {questionCaptions.no}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
