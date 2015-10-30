import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import _ from 'underscore';
import $ from 'jquery';
import captions from '../../data/captions';
import { isObject } from 'underscore';
import Left from './Left';

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
    setMatrixResultValue: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.icons = require('../Styles/icons.less');
    this.styles = require('./Matrix.less');
    this.customRefs = {};
    this.captions = captions.matrix;
  }

  componentDidMount() {
    setTimeout(() => {
      _.map(this.customRefs, (e) => {
        const i = _.compact(e);
        const max = this.getMaxHeight(i);
        $(i).height(max);
      });
    }, 500);
  }

  getLineBlocks(line) {
    const { matrix } = this.props;
    const lineBlocks = [];
    _.each(matrix, (col) => {
      lineBlocks.push(col.blocks[line].elems);
    });
    return _.flatten(lineBlocks);
  }

  getMaxHeight(elems) {
    let max = 0;
    _.map(elems, (e) => {
      if (max < $(e).outerHeight()) {
        max = $(e).outerHeight();
      }
    });
    return max;
  }

  getValueClass(value) {
    switch (value) {
      case 0:
        return this.styles.error;
      case 1:
        return this.styles.ok;
      case 2:
        return this.styles.fade;
      default:
        return '';
    }
  }

  renderElem(elem, key) {
    const { styles } = this;
    const elemClass = styles.elem;
    if (isObject(elem)) {
      return (
        <div
          className={[elemClass, this.getValueClass(elem.value)].join(' ')}
          key={key}
        >{elem.text}</div>
      );
    }
    return (
      <div className={styles.elem} key={key}>{elem}</div>
    );
  }

  renderBlock(block, key) {
    const { styles } = this;
    return (
      <div
        className={styles.block}
        key={key}
        ref={(ref) => {
          this.customRefs[key] = this.customRefs[key] || [];
          this.customRefs[key].push(ref);
        }}
      >
        {block.left &&
          <Left
            styles={styles}
            icons={this.icons}
            block={block}
            level={key}
            getLineBlocks={::this.getLineBlocks}
            setMatrixResultValue={this.props.setMatrixResultValue}
          />
        }
        <div className={styles.blockLabel}>{block.label}</div>
        <div className={styles.elems}>
          {_.map(block.elems, (c, k) => {
            return this.renderElem(c, k);
          })}
        </div>
        {block.after &&
          <div className={styles.after}>
            {block.after}
          </div>
        }
      </div>
    );
  }

  renderSummary(column) {
    const { styles } = this;
    const summaryKey = 'summaryKey';
    return (
      <div
        className={styles.summary}
        ref={(ref) => {
          this.customRefs[summaryKey] = this.customRefs[summaryKey] || [];
          this.customRefs[summaryKey].push(ref);
        }}
      >
        <div className={styles.summaryLabel}>
          {column.summary.label}
        </div>
        {column.summary.elems &&
          <div className={styles.summaryContent}>
            {column.summary.elems.join(', ')}
          </div>
        }
      </div>
    );
  }

  renderColumn(column, key) {
    const { styles } = this;
    return (
      <div className={styles.column} key={key}>
        <div className={styles.label}>{column.label}</div>
        <div className={styles.blocks}>
          {_.map(column.blocks, (c, k) => {
            return this.renderBlock(c, k);
          })}
        </div>
        {this.renderSummary(column)}
      </div>
    );
  }

  render() {
    const { matrix } = this.props;
    const { styles } = this;
    return (
      <div className={styles.matrix}>
        {_.map(matrix, (c, k) => {
          return this.renderColumn(c, k);
        })}
      </div>
    );
  }

}
