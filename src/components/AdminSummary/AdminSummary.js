import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import moment from 'moment';
import captions from '../../data/captions';

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
    const icons = require('../Styles/icons.less');
    console.log(question);
    return (
      <tr key={questionId}>
        {_.map(results, (result) => {
          return (
            <td className={styles.result}>
              {result.answers && result.answers[questionId] &&
                <i className={icons[result.answers[questionId].value + 'Active']}></i>
              }
            </td>
          );
        })}
      </tr>
    );
  }

  renderRightTop(result, styles) {
    const createdAt = moment(result.createdAt);
    console.log(result);
    return (
      <div title={result.productName} className={styles.productName}>
        <span className={styles.productNameTitle}>{result.productName}</span>
        <span className={styles.productNameDate}>{createdAt.format(captions.dateFormats.std)}</span>
      </div>
    );
  }

  render() {
    const styles = require('./AdminSummary.less');
    const { questions, results } = this.props;
    return (
      <div className={styles.tablesWrapper}>
        <table className={styles.leftTable}>
          <tbody>
            {_.map(questions, (e, i) => this.renderLeft(e, i, styles))}
          </tbody>
        </table>
        <div className={styles.rightWrapper}>
          <div className={styles.productNames} style={{width: 100 * results.length}}>
            {_.map(results, (e) => this.renderRightTop(e, styles))}
          </div>
          <table className={styles.rightTable} style={{width: 100 * results.length}}>
            <tbody>
              {_.map(questions, (e, i) => this.renderRight(e, i, styles))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}
