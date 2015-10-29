import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { map } from 'underscore';
import $ from 'jquery';
import captions from '../../data/captions';
import { isObject } from 'underscore';

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
    this.icons = require('../Styles/icons.less');
    this.styles = require('./Matrix.less');
    this.customRefs = {};
    this.captions = captions.matrix;
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

  renderLeft(block) {
    const { styles } = this;
    return (
      <div className={styles.left}>
        <div className={styles.leftLabel}>
          <i className={this.icons[block.left.icon]}></i>
          {block.left.label}
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressTop}>
            <div className={styles.progressCaption}>
              {this.captions.progressCaption}
            </div>
            <div className={styles.progressPercent}>
              70%
            </div>
          </div>
          <div className={styles.progress}>
            <div className={styles.progressActive} style={{width: 70 + '%'}}></div>
          </div>
          <div className={styles.progressP}>
            {this.captions.nice}
          </div>
        </div>
      </div>
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
        {block.left && this.renderLeft(block)}
        <div className={styles.blockLabel}>{block.label}</div>
        <div className={styles.elems}>
          {map(block.elems, (c, k) => {
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
    const { styles } = this;
    return (
      <div className={styles.matrix}>
        {map(matrix, (c, k) => {
          return this.renderColumn(c, k);
        })}
      </div>
    );
  }

}
