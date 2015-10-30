import React, { Component, PropTypes } from 'react';
import {
  isLoaded as isLoadedQuestions,
  load as loadQuestions } from 'redux/modules/questions';
import {
  isLoaded as isLoadedAnswers,
  load as loadAnswers,
  storeAnswer } from 'redux/modules/answers';
import { Carcas, QuestionInformation, Buttons } from '..';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers
  }),
  {pushState, isLoadedQuestions, loadQuestions,
   storeAnswer, isLoadedAnswers, loadAnswers })
export default class Question extends Component {

  static propTypes = {
    params: PropTypes.object,
    questions: PropTypes.object,
    answers: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    storeAnswer: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = this.constructParams(props);
  }

  componentDidMount() {
    this.changeQuestion();
    this.refs.carcas.showLine();
  }

  componentWillReceiveProps(nextProps) {
    if (parseInt(nextProps.params.questionId, 10) - 1 !== this.state.questionId) {
      this.lock = false;
      this.setState(this.constructParams(nextProps), () => {
        this.changeQuestion();
      });
    }
  }

  constructParams(props) {
    const { questions } = props;
    const questionId = parseInt(props.params.questionId, 10) - 1;
    const questionsCount = questions.count;
    const question = questions[questionId];
    const back = props.params.back && true;
    const prevQuestion = questionId > 0 && questions[questionId - 1];
    const prev = prevQuestion && questionId;
    const nextQuestion = questionsCount - 1 > questionId && questions[questionId + 1];
    const next = nextQuestion && questionId + 2;
    return {
      questionsCount, questionId, question, next,
      nextQuestion, prev, prevQuestion, back
    };
  }

  changeQuestion() {
    const { carcas } = this.refs;
    const { question, questionId, back, nextQuestion } = this.state;
    const topOfLine = question.firstOfType ?
      carcas.hideTopOfLine() :
      carcas.showTopOfLine();
    const bottomOfLine = !nextQuestion || nextQuestion.firstOfType ?
      carcas.hideBottomOfLine() :
      carcas.showBottomOfLine();
    const animation = back ?
      carcas.topToCenter() :
      carcas.bottomToCenter();
    carcas.setLineColor(question.color, 200);
    carcas.setBackgroundClass(questionId);
    carcas.showLine();
    return { topOfLine, bottomOfLine, animation };
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

  storeValue(value) {
    const storedVal = value === 0 ? 'no' : 'yes';
    this.props.storeAnswer({
      id: this.state.questionId,
      value: storedVal
    });
  }

  handleButtonWithTimeout(button) {
    this.storeValue(button);
    setTimeout(() => {
      this.handleButton();
    }, 300);
  }

  handleButton() {
    const { carcas } = this.refs;
    const { next, nextQuestion } = this.state;
    if (next) {
      if (nextQuestion && nextQuestion.firstOfType) {
        carcas.setLineColor('transparent', 0);
      }
      carcas.animateToTop(
        () => this.props.pushState(null, '/questions/' + next)
      );
    } else {
      carcas.animateToTop(
        () => this.props.pushState(null, '/results')
      );
    }
  }

  handleBack() {
    if (!this.lock) {
      this.lock = true;
      const { carcas } = this.refs;
      const { question, prev } = this.state;
      if (this.state.prev) {
        if (question.firstOfType) {
          carcas.setLineColor('transparent', 0);
        }
        carcas.animateToBottom(
          () => this.props.pushState(null, '/questions/' + prev + '/back')
        );
      }
    }
  }

  render() {
    const answer = this.props.answers.answers[this.state.questionId];
    const { question, questionsCount, prev } = this.state;
    return (
      <Carcas ref="carcas">
        <QuestionInformation
          handleBack={::this.handleBack}
          back={prev}
          questionsCount={questionsCount}
          {...question}
        />
        <Buttons
          answer={answer}
          handleYes={::this.handleButtonWithTimeout}
          handleNo={::this.handleButtonWithTimeout}
        />
      </Carcas>
    );
  }

}
