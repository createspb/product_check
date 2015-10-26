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
    this.refs.carcas.moveToBottom();
    setTimeout(() => {
      this.refs.carcas.animateFromBottom();
    }, 5);
  }

  componentWillReceiveProps(nextProps) {
    const { questions } = nextProps;
    const questionId = parseInt(nextProps.params.questionId, 10);
    const { count } = questions;
    let next = false;
    if (count > questionId) {
      next = questionId + 1;
    }
    const promises = [];
    promises.push(this.refs.carcas.moveToBottom());
    promises.push(
      setTimeout(() => { this.refs.carcas.animateFromBottom(); }, 10)
    );
    promises.push(
      this.setState({
        questionsCount: count,
        questionId: questionId,
        question: questions[questionId - 1],
        next: next
      })
    );
    Promise.all(promises);
  }

  static fetchData(getState, dispatch) {
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
  }

  handleButton(event) {
    event.stopPropagation();
    if (this.state.next) {
      this.refs.carcas.animateToTop();
      setTimeout(() => {
        this.props.pushState(null, '/questions/' + this.state.next);
      }, 300);
    }
  }

  render() {
    console.log(this.state);
    const { question } = this.state;
    return (
      <Carcas ref="carcas">
        <QuestionInformation
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
