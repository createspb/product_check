import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { map } from 'underscore';
import $ from 'jquery';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers,
    matrix: state.matrix.matrix
  }),
  { pushState })
export default class Matrix extends Component {

  static propTypes = {
    questions: PropTypes.object,
    answers: PropTypes.object,
    matrix: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.styles = require('./Matrix.less');
    this.customRefs = {};
  }

  componentDidMount() {
    setTimeout(() => {
      map(this.customRefs, (e) => {
        const max = this.getMaxHeight(e);
        $(e).height(max);
      });
    }, 500);
  }

  getMaxHeight(elems) {
    let max = 0;
    map(elems, (e) => {
      if (max < $(e).outerHeight()) {
        max = $(e).outerHeight();
      }
    });
    return max;
  }

  renderElem(elem, key) {
    return (
      <div className={this.styles.elem} key={key}>{elem}</div>
    );
  }

  renderBlock(block, key) {
    return (
      <div
        className={this.styles.block}
        key={key}
        ref={(ref) => {
          this.customRefs[key] = this.customRefs[key] || [];
          this.customRefs[key].push(ref);
        }}
      >
        <div className={this.styles.blockLabel}>{block.label}</div>
        <div className={this.styles.elems}>
          {map(block.elems, (c, k) => {
            return this.renderElem(c, k);
          })}
        </div>
        {block.after &&
          <div className={this.styles.after}>
            {block.after}
          </div>
        }
      </div>
    );
  }

  renderSummary(column) {
    const summaryKey = 'summaryKey';
    return (
      <div
        className={this.styles.summary}
        ref={(ref) => {
          this.customRefs[summaryKey] = this.customRefs[summaryKey] || [];
          this.customRefs[summaryKey].push(ref);
        }}
      >
        <div className={this.styles.summaryLabel}>
          {column.summary.label}
        </div>
        {column.summary.elems &&
          <div className={this.styles.summaryContent}>
            {column.summary.elems.join(', ')}
          </div>
        }
      </div>
    );
  }

  renderColumn(column, key) {
    return (
      <div className={this.styles.column} key={key}>
        <div className={this.styles.label}>{column.label}</div>
        <div className={this.styles.blocks}>
          {map(column.blocks, (c, k) => {
            return this.renderBlock(c, k);
          })}
        </div>
        {this.renderSummary(column)}
      </div>
    );
  }

  render() {
    const { matrix } = this.props;
    return (
      <div className={this.styles.matrix}>
        {map(matrix, (c, k) => {
          return this.renderColumn(c, k);
        })}
      </div>
    );
  }

}
