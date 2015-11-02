import React, { Component, PropTypes } from 'react';
import { isLoaded, loadByAnswers } from 'redux/modules/matrix';
import { connect } from 'react-redux';
import _ from 'underscore';
import captions from '../../data/captions';
import { Matrix } from '..';

@connect(
  state => ({
    questions: state.questions.questions,
    matrixByAnswers: state.matrix.matrixByAnswers
  }), { isLoaded, loadByAnswers })
export default class AdminResult extends Component {

  static propTypes = {
    result: PropTypes.object.isRequired,
    questions: PropTypes.object,
    matrix: PropTypes.object,
    loadByAnswers: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.loadByAnswers(this.props.result.answers);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matrixByAnswers: nextProps.matrixByAnswers
    });
  }

  setMatrixResultValue(value) {
    return value;
  }

  value(value) {
    return captions.questionCaptions[value];
  }

  question(id) {
    return this.props.questions[id];
  }

  renderAnswer(answer, key, styles) {
    const { questions } = this.props;
    return (
      <dl className={styles.dl} key={key}>
        <dd className={styles.dd}>
          <span className={styles.num}>
            {parseInt(key, 10) + 1} / {questions.count}
          </span>
          <em>{this.value(answer.value)}</em>
        </dd>
        <dt className={styles.dt}>
          {this.question(answer.id).title}
        </dt>
      </dl>
    );
  }

  render() {
    const styles = require('./AdminResult.less');
    const { result } = this.props;
    return (
      <div className={styles.wrap}>
        <div className={styles.answers}>
          {_.map(result.answers, (answer, key) => {
            return this.renderAnswer(answer, key, styles);
          })}
        </div>
        {this.state.matrixByAnswers &&
          <Matrix
            setMatrixResultValue={::this.setMatrixResultValue}
            matrixByAnswers={this.state.matrixByAnswers}
          />
        }
      </div>
    );
  }

}
