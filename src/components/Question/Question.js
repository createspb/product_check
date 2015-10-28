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
    this.state = this.constructParams(props);
  }

  componentDidMount() {
    this.changeQuestion();
    this.refs.carcas.showLine();
  }

  componentWillReceiveProps(nextProps) {
    const constructedProps = this.constructParams(nextProps);
    if (constructedProps.questionId !== this.state.questionId) {
      this.lock = false;
      this.setState(constructedProps, () => {
        this.changeQuestion();
      });
    }
  }

  constructParams(props) {
    const { questions } = props;
    const questionId = parseInt(props.params.questionId, 10);
    const questionsCount = questions.count;
    const question = questions[questionId - 1];
    const back = props.params.back && true;
    const prev = questionId > 0 && questionId - 1;
    const prevQuestion = prev && questions[questionId - 2];
    const next = questionsCount > questionId && questionId + 1;
    const nextQuestion = next && questions[questionId];
    return {
      questionsCount, questionId, question, next,
      nextQuestion, prev, prevQuestion, back
    };
  }

  changeQuestion() {
    const { carcas } = this.refs;
    const { question, questionId, back } = this.state;
    const nextQuestion = this.props.questions[questionId];
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
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
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
    if (this.state.next) {
      if (this.state.nextQuestion && this.state.nextQuestion.firstOfType) {
        carcas.setLineColor('transparent', 0);
      }
      carcas.animateToTop(
        () => this.props.pushState(null, '/questions/' + this.state.next)
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
