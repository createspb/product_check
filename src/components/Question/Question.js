import React, { Component, PropTypes } from 'react';
import { isLoaded, load } from 'redux/modules/questions';
import { storeAnswer } from 'redux/modules/answers';
import { Carcas, QuestionInformation, Buttons } from '..';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers
  }),
  {pushState, isLoaded, load, storeAnswer})
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
    const { questionsCount, questionId, question, next, nextQuestion,
            prev, prevQuestion, back } = this.constructParams(props);
    this.state.questionsCount = questionsCount;
    this.state.questionId = questionId;
    this.state.question = question;
    this.state.next = next;
    this.state.nextQuestion = nextQuestion;
    this.state.prev = prev;
    this.state.prevQuestion = prevQuestion;
    this.state.back = back;
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

  componentWillReceiveProps(nextProps) {
    const { questionsCount, questionId, question, next, nextQuestion,
            prev, prevQuestion, back } = this.constructParams(nextProps);
    if (questionId !== this.state.questionId) {
      this.setState({
        questionsCount, questionId, question, back, next, nextQuestion,
        prev, prevQuestion
      }, () => {
        this.changeQuestion();
      });
    }
  }

  constructParams(props) {
    const { questions } = props;
    const questionId = parseInt(props.params.questionId, 10);
    const { count: questionsCount } = questions;
    const question = questions[questionId - 1];
    let next = false;
    let prev = false;
    let back = false;
    let prevQuestion = undefined;
    let nextQuestion = undefined;
    if (props.params.back) {
      back = true;
    }
    if (questionId > 0) {
      prev = questionId - 1;
      prevQuestion = questions[questionId - 2];
    }
    if (questionsCount > questionId) {
      next = questionId + 1;
      nextQuestion = questions[questionId];
    }
    return {
      questionsCount, questionId, question, next,
      nextQuestion, prev, prevQuestion, back
    };
  }

  changeQuestion() {
    const { carcas } = this.refs;
    const { question, questionId, back } = this.state;
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
    if (back) {
      carcas.topToCenter();
    } else {
      carcas.bottomToCenter();
    }
    carcas.setBackgroundClass(questionId);
    carcas.showLine();
  }

  static fetchData(getState, dispatch) {
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
  }

  storeValue(value) {
    switch (value) {
      case 0:
        this.props.storeAnswer({
          id: this.state.questionId,
          value: 'no'
        });
        break;
      case 1:
        this.props.storeAnswer({
          id: this.state.questionId,
          value: 'yes'
        });
        break;
      default:
        console.log('error');
    }
  }

  handleButtonWithTimeout(button) {
    this.storeValue(button);
    setTimeout(() => {
      this.handleButton();
    }, 300);
  }

  handleButton() {
    const { carcas } = this.refs;
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
      carcas.animateToBottom(
        () => this.props.pushState(null, '/questions/' + this.state.prev + '/back')
      );
    }
  }

  render() {
    const answer = this.props.answers[this.state.questionId];
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
