import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

@connect(
  state => state,
  {pushState})
export default class Question extends Component {

  static propTypes = {
    params: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  handleButton(event) {
    event.stopPropagation();
    const { questionId } = this.props.params;
    this.props.pushState(null, '/questions/' + (parseInt(questionId, 10) + 1));
  }

  render() {
    const { question } = captions;
    const { questionId } = this.props.params;
    const styles = require('./Question.less');
    const icons = require('../Styles/icons.less');
    return (
      <div className={styles.question}>
        <div className={styles.container}>
          <div className={styles.containerRow}>
            <div className={styles.containerCell}>
              <div className={styles.containerRight}>
                <div className={icons.main}></div>
              </div>
              <div className={styles.containerLeft}>
                { questionId }
                <div className={styles.buttons}>
                  <button onClick={::this.handleButton} className={styles.transparentButton}>
                    <i className={icons.yes}></i>
                    {question.yes}
                  </button>
                  <button onClick={::this.handleButton} className={styles.button}>
                    <i className={icons.no}></i>
                    {question.no}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
