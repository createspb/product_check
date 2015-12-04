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
    matrix: state.matrix.matrix
  }),
  { pushState })
export default class Matrix extends Component {

  static propTypes = {
    questions: PropTypes.object,
    matrix: PropTypes.object,
    setMatrixResultValue: PropTypes.func.isRequired,
    matrixByAnswers: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.matrix = this.props.matrixByAnswers ?
                  this.props.matrixByAnswers :
                  this.props.matrix;
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
    const { matrix } = this;
    const lineBlocks = [];
    _.each(matrix, (col) => {
      lineBlocks.push(col.blocks[line].elems);
    });
    return _.flatten(lineBlocks);
  }

  getSummaryStatus(column) {
    const summaryElems = this.matrix[column].summary.elems;
    const errElemsBlocks = _.where(summaryElems, {
      value: 0
    });
    // return true if has errors elems
    return _.size(errElemsBlocks) > 0;
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
    let elemClass = styles.elem;
    if (elem.tooltip) {
      elemClass = [elemClass, styles.hoverable].join(' ');
    }
    if (isObject(elem)) {
      return (
        <div
          className={[elemClass, this.getValueClass(elem.value)].join(' ')}
          key={key}
        >
          <span dangerouslySetInnerHTML={{__html: elem.text}} />
          {elem.tooltip &&
            <span
              className={styles.tooltip}
              dangerouslySetInnerHTML={{__html: elem.tooltip}}
            />
          }
        </div>
      );
    }
    return (
      <div
        className={styles.elem}
        key={key}
        dangerouslySetInnerHTML={{__html: elem}}
      />
    );
  }

  renderSummaryElem(elem, key) {
    const { styles } = this;
    const elemClass = styles.summaryElem;
    if (isObject(elem)) {
      return (
        <div
          className={[elemClass, this.getValueClass(elem.value)].join(' ')}
          key={key}
        >{elem.text}</div>
      );
    }
    return (
      <div
        className={[elemClass, this.getValueClass(elem.value)].join(' ')}
        key={key}
      >{elem}</div>
    );
  }

  renderAfter(elem) {
    const { styles } = this;
    const elemClass = styles.after;
    if (isObject(elem)) {
      return (
        <div
          className={[elemClass, this.getValueClass(elem.value)].join(' ')}
          dangerouslySetInnerHTML={{__html: elem.text}}
        />
      );
    }
    return (
      <div
        className={styles.after}
        dangerouslySetInnerHTML={{__html: elem}}
      />
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
        <div
          className={styles.blockLabel}
          dangerouslySetInnerHTML={{__html: block.label}}
        />
        <div className={styles.elems}>
          {_.map(block.elems, (c, k) => {
            return this.renderElem(c, k);
          })}
        </div>
        {block.after &&
          this.renderAfter(block.after)
        }
      </div>
    );
  }

  renderSummary(column, key) {
    const { styles } = this;
    const summaryKey = 'summaryKey';
    const summaryLabelClasses = [styles.summaryLabel];
    if (this.getSummaryStatus(key)) {
      summaryLabelClasses.push(styles.summaryLabelWarning);
    }
    return (
      <div
        className={styles.summary}
        ref={(ref) => {
          this.customRefs[summaryKey] = this.customRefs[summaryKey] || [];
          this.customRefs[summaryKey].push(ref);
        }}
      >
        <div className={summaryLabelClasses.join(' ')}>
          {column.summary.label}
        </div>
        {column.summary.elems &&
          <div className={styles.summaryContent}>
            {_.map(column.summary.elems, (c, k) => {
              return this.renderSummaryElem(c, k);
            })}
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
        {this.renderSummary(column, key)}
      </div>
    );
  }

  render() {
    const { styles, matrix } = this;
    return (
      <div className={styles.matrix}>
        {_.map(matrix, (c, k) => {
          return this.renderColumn(c, k);
        })}
      </div>
    );
  }

}
