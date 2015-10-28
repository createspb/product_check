import React, { Component, PropTypes } from 'react';
import { ResultsCarcas } from '..';
import { connect } from 'react-redux';
import { isLoaded, load } from 'redux/modules/questions';
import { pushState } from 'redux-router';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers
  }),
  {pushState, isLoaded, load})
export default class Results extends Component {

  static propTypes = {
    questions: PropTypes.object,
    answers: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
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
    if (!isLoaded(getState())) return Promise.all([dispatch(load())]);
  }

  render() {
    return (
      <ResultsCarcas ref="carcas">
        <h1>Results</h1>
      </ResultsCarcas>
    );
  }

}
