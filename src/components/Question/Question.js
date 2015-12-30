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
    } else {
      const questionId = parseInt(nextProps.params.questionId, 10) - 1;
      const answer = nextProps.answers &&
                     nextProps.answers.answers &&
                     nextProps.answers.answers[questionId];
      this.setState({
        answer: answer
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
    const answer = props.answers &&
                   props.answers.answers &&
                   props.answers.answers[questionId];
    return {
      questionsCount, questionId, question, next,
      nextQuestion, prev, prevQuestion, back, answer
    };
  }

  changeQuestion() {
    if (window) {
      ga('send', 'event', 'question', 'question_' + this.props.params.questionId); // eslint-disable-line
    }
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
        carcas.animateToTop(
          () => this.props.pushState(null, '/subresults/' + next)
        );
      } else {
        carcas.animateToTop(
          () => this.props.pushState(null, '/questions/' + next)
        );
      }
    } else {
      carcas.animateToTop(
        () => this.props.pushState(null, '/name')
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

  handleWheel(event) {
    const { answer } = this.state;
    if (event.deltaY < -100) {
      this.handleBack();
    }
    if (event.deltaY > 100 && answer) {
      this.handleButton();
    }
  }

  render() {
    const { question, questionsCount, prev, answer } = this.state;
    const backId = this.state.questionId - 1;

    return (
      <Carcas ref="carcas" backId = {backId}>
        <div onWheel={::this.handleWheel}>
          <QuestionInformation
            handleBack={::this.handleBack}
            handleNext={::this.handleButton}
            back={prev}
            next={answer}
            questionsCount={questionsCount}
            {...question}
          />
          <Buttons
            answer={answer}
            handleYes={::this.handleButtonWithTimeout}
            handleNo={::this.handleButtonWithTimeout}
          />
        </div>
      </Carcas>
    );
  }

}
