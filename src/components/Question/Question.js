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

  constructor(props) {
    super(props);
    const { questions } = this.props;
    const questionId = parseInt(this.props.params.questionId, 10);
    const { count } = questions;
    let next = false;
    if (count > questionId) {
      next = questionId + 1;
    }
    this.state.questionsCount = count;
    this.state.questionId = questionId;
    this.state.question = questions[questionId - 1];
    this.state.next = next;
  }

  state = {
    questionsCount: undefined,
    question: undefined,
    questionId: undefined,
    next: undefined
  };

  componentDidMount() {
    this.changeQuestion();
    this.refs.carcas.showLine();
  }

  componentWillReceiveProps(nextProps) {
    const { questions } = nextProps;
    const questionId = parseInt(nextProps.params.questionId, 10);
    const { count } = questions;
    let next = false;
    if (count > questionId) {
      next = questionId + 1;
    }
    this.setState({
      questionsCount: count,
      questionId: questionId,
      question: questions[questionId - 1],
      next: next
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
    carcas.setLineColor(question.color);
    carcas.bottomToCenter();
    carcas.setBackgroundClass(questionId);
    carcas.showLine();
  }

  static fetchData(getState, dispatch) {
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
  }

  handleButton(button) {
    if (button === 1) {
      // store yes
      console.log('yes');
    }
    if (button === 0) {
      // store no
      console.log('no');
    }
    if (this.state.next) {
      this.refs.carcas.animateToTop(
        () => this.props.pushState(null, '/questions/' + this.state.next)
      );
    } else {
      // results callback
      console.log('results');
    }
  }


  render() {
    const { question, questionsCount } = this.state;
    return (
      <Carcas ref="carcas">
        <QuestionInformation
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
