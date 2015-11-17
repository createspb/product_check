import React, { Component, PropTypes } from 'react';
import _ from 'underscore';

export default class Admin extends Component {

  static propTypes = {
    questions: React.PropTypes.object.isRequired,
    results: PropTypes.array.isRequired
  }

  getPercent(num) {
    const { results } = this.props;
    let countYes = 0;
    for (const result of results) {
      if (result.answers && result.answers[num].value === 'yes') {
        countYes++;
      }
    }
    console.log(countYes, results.length);
    return (countYes / results.length * 100).toFixed(1);
  }

  renderLeft(e, i, styles) {
    if (!e.title) { return false; }
    return (
      <tr key={i}>
        <td className={styles.idCol}>{parseInt(i, 10) + 1}</td>
        <td className={styles.percentCol}>{this.getPercent(parseInt(i, 10))}%</td>
      </tr>
    );
  }

  renderRight(question, questionId, styles) {
    const { results } = this.props;
    console.log(question);
    return (
      <tr key={questionId}>
        {_.map(results, (result) => {
          return (
            <td className={styles.result}>
              {result.answers && result.answers[questionId] && result.answers[questionId].value}
            </td>
          );
        })}
      </tr>
    );
  }

  renderRightTop(result, styles) {
    console.log(result);
    return (
      <div title={result.productName} className={styles.productName}>
        {result.productName}
      </div>
    );
  }

  render() {
    const styles = require('./AdminSummary.less');
    const { questions, results } = this.props;
    return (
      <div className={styles.tablesWrapper}>
        <table className={styles.leftTable}>
          {_.map(questions, (e, i) => this.renderLeft(e, i, styles))}
        </table>
        <div className={styles.rightWrapper}>
          <div className={styles.productNames} style={{width: 100 * results.length}}>
            {_.map(results, (e) => this.renderRightTop(e, styles))}
          </div>
          <table className={styles.rightTable} style={{width: 100 * results.length}}>
            {_.map(questions, (e, i) => this.renderRight(e, i, styles))}
          </table>
        </div>
      </div>
    );
  }

}
