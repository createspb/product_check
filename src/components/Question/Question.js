import React, { Component, PropTypes } from 'react';
import { isLoaded, load } from 'redux/modules/questions';
import { Carcas, QuestionInformation, Buttons } from '..';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => ({questions: state.questions.questions}),
  {pushState, isLoaded, load})
export default class Question extends Component {

  static propTypes = {
    params: PropTypes.object,
    questions: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  // TODO: refactor with cwrp
  constructor(props) {
    super(props);
    const { questions } = this.props;
    const questionId = parseInt(this.props.params.questionId, 10);
    const { count } = questions;
    let next = false;
    let prev = false;
    if (questionId > 0) {
      prev = questionId - 1;
      this.state.prevQuestion = questions[questionId - 2];
    }
    if (count > questionId) {
      next = questionId + 1;
      this.state.nextQuestion = questions[questionId];
    }
    this.state.questionsCount = count;
    this.state.questionId = questionId;
    this.state.question = questions[questionId - 1];
    this.state.next = next;
    this.state.prev = prev;
  }

  state = {
    questionsCount: undefined,
    question: undefined,
    questionId: undefined,
    prev: undefined,
    prevQuestion: undefined,
    next: undefined,
    nextQuestion: undefined
  };

  componentDidMount() {
    this.changeQuestion();
    this.refs.carcas.showLine();
  }

  // TODO: refactor with constructor
  componentWillReceiveProps(nextProps) {
    const { questions } = nextProps;
    const questionId = parseInt(nextProps.params.questionId, 10);
    const { count } = questions;
    let next = false;
    let prev = false;
    let prevQuestion = undefined;
    let nextQuestion = undefined;
    if (questionId > 0) {
      prev = questionId - 1;
      prevQuestion = questions[questionId - 2];
    }
    if (count > questionId) {
      next = questionId + 1;
      nextQuestion = questions[questionId];
    }
    this.setState({
      questionsCount: count,
      questionId: questionId,
      question: questions[questionId - 1],
      next: next,
      nextQuestion: nextQuestion,
      prev: prev,
      prevQuestion: prevQuestion
    }, () => {
      this.changeQuestion();
    });
  }

  changeQuestion() {
    const { carcas } = this.refs;
    const { question, questionId } = this.state;
    const nextQuestion = this.props.questions[questionId];
    if (question.firstOfType) {
      carcas.hideTopOfLine();
    } else {
      carcas.showTopOfLine();
    }
    if (!nextQuestion || nextQuestion.firstOfType) {
      carcas.hideBottomOfLine();
    } else {
      carcas.showBottomOfLine();
    }
    carcas.setLineColor(question.color, 200);
    carcas.bottomToCenter();
    carcas.setBackgroundClass(questionId);
    carcas.showLine();
  }

  static fetchData(getState, dispatch) {
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
  }

  storeValue(value) {
    switch (value) {
      case 0:
        console.log('no');
        break;
      case 1:
        console.log('yes');
        break;
      default:
        console.log('error');
    }
  }

  handleButton(button) {
    const { carcas } = this.refs;
    this.storeValue(button);
    if (this.state.next) {
      if (this.state.nextQuestion && this.state.nextQuestion.firstOfType) {
        carcas.setLineColor('transparent', 0);
      }
      carcas.animateToTop(
        () => this.props.pushState(null, '/questions/' + this.state.next)
      );
    } else {
      // results callback
      console.log('results');
    }
  }

  handleBack() {
    const { carcas } = this.refs;
    const { question } = this.state;
    if (this.state.prev) {
      if (question.firstOfType) {
        carcas.setLineColor('transparent', 0);
      }
      this.refs.carcas.animateToTop(
        () => this.props.pushState(null, '/questions/' + this.state.prev)
      );
    }
  }

  render() {
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
          handleYes={::this.handleButton}
          handleNo={::this.handleButton}
        />
      </Carcas>
    );
  }

}
