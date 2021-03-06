import $ from 'jquery';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  isLoaded as isLoadedQuestions,
  load as loadQuestions } from 'redux/modules/questions';
import {
  isLoaded as isLoadedAnswers,
  load as loadAnswers,
  repeatTest } from 'redux/modules/answers';
import {
  isLoaded as isLoadedMatrix,
  load as loadMatrix } from 'redux/modules/matrix';
import { pushState } from 'redux-router';
import captions from '../../data/captions';
import { ResultsCarcas, Matrix, Feedback } from '..';

@connect(
  state => ({
    questions: state.questions.questions,
    answers: state.answers
  }),
  {pushState,
   isLoadedQuestions, loadQuestions,
   isLoadedMatrix, loadMatrix,
   isLoadedAnswers, loadAnswers, repeatTest})
export default class Results extends Component {

  static propTypes = {
    questions: PropTypes.object,
    answers: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    repeatTest: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    // check hasLostAnswers
    if (this.hasLostAnswers()) {
      this.props.pushState(null, '/');
    }
    this.state = {
      feedback: false
    };
  }

  componentDidMount() {
    const { carcas } = this.refs;
    if (window) {
      ga('send', 'event', 'results'); // eslint-disable-line
    }
    carcas.bottomToCenter();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.answers.loaded) {
      this.props.pushState(null, '/');
    }
  }

  setMatrixResultValue(value) {
    setTimeout(() => {
      if (this.h1 && this.p) {
        for (const r of captions.matrix.results) {
          if (value >= r.minValue && value <= r.maxValue) {
            $(this.h1).html(r.text);
            $(this.p).html(r.description);
          }
        }
      }
    }, 0);
  }

  hasLostAnswers() {
    const { answers, questions } = this.props;
    return !answers.answers
           || Object.keys(answers.answers).length < questions.count;
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    promises.push(dispatch(loadMatrix()));
    if (!isLoadedQuestions(getState())) {
      promises.push(dispatch(loadQuestions()));
    }
    if (!isLoadedAnswers(getState())) {
      promises.push(dispatch(loadAnswers()));
    }
    return Promise.all(promises);
  }

  // renderArticleButton(styles, icons, results) {
  //   return (
  //     <a
  //       href="http://createdigital.me/blog/2015/10/19/matrica-cifrovogo-produkta-vvodnaya/"
  //       target="_blank"
  //       className={styles.article}
  //     >
  //       <i className={icons.matrix}></i>
  //       <div className={styles.articleData}>
  //         <div className={styles.articleTitle}>
  //           {results.articleTitle}
  //         </div>
  //         <div className={styles.articleDescription}>
  //           {results.articleDescription}
  //         </div>
  //       </div>
  //     </a>
  //   );
  // }

  handleRepeatButton(event) {
    event.stopPropagation();
    this.props.repeatTest();
  }

  handleExternalLink(event) {
    ga('send', 'event', 'externalLink', $(event.currentTarget).attr('href')); // eslint-disable-line
  }

  handleCloseFeedback(event) {
    event.stopPropagation();
    this.setState({
      feedback: false
    });
  }

  handleFeedbackButton(event) {
    event.stopPropagation();
    this.setState({
      feedback: true
    });
  }

  renderArticleButton(styles, icons, results) {
    return (
      <a
        href="http://createdigital.me/blog/2015/10/19/matrica-cifrovogo-produkta-vvodnaya/"
        target="_blank"
        className={styles.transparentButton}
        onClick={::this.handleExternalLink}
      >
        <i className={icons.matrix1}></i>
        {results.articleTitle}
      </a>
    );
  }

  renderNext(styles, icons, results) {
    const site = 'http://product-check.createdigital.me/';
    const { fbShare, vkShare, twShare } = {
      twShare: 'https://twitter.com/intent/tweet?url=' + site,
      fbShare: 'https://www.facebook.com/sharer/sharer.php?&u=' + site,
      vkShare: 'http://vk.com/share.php?url=' + site
    };
    return (
      <div className={styles.next}>
        <h1 className={styles.h1}>
          <i className={icons.next}></i>
          {results.nextH1}
        </h1>

        <div className={styles.center}>
          <p
            className={styles.p}
            dangerouslySetInnerHTML={{__html: results.nextCenter}}
          />
          <button
            className={styles.transparentButton}
            onClick={::this.handleRepeatButton}
          >
            <i className={icons.repeat}></i>
            {results.repeat}
          </button>
        </div>
        <div className={styles.feedback}>
          <p
            className={styles.p}
            dangerouslySetInnerHTML={{__html: results.feedback}}
          />
          <button
            className={styles.transparentButton}
            onClick={::this.handleFeedbackButton}
          >
            <i className={icons.feedback}></i>
            {results.feedbackButton}
          </button>
        </div>
        <div className={styles.right}>
          <p
            className={styles.p}
            dangerouslySetInnerHTML={{__html: results.nextRight}}
          />
          <ul className={styles.social}>
            <li><a href={fbShare} target="_blank">
              <i className={icons.fb}></i>
            </a></li>
            <li><a href={vkShare} target="_blank">
              <i className={icons.vk}></i>
            </a></li>
            <li><a href={twShare} target="_blank">
              <i className={icons.tw}></i>
            </a></li>
          </ul>
        </div>
      </div>
    );
  }

  // <div className={styles.left}>
  //   <p className={styles.p}>{results.nextLeft}</p>
  //   {this.renderArticleButton(styles, icons, results)}
  // </div>

  renderFooter(styles, icons) {
    const { welcome, results } = captions;
    return (
      <div className={styles.footer}>
        <div className={styles.license}>
          <i className={icons.cc}></i>
          <p className={styles.dh}>
            {'This work is licensed under a Creative Commons '}
            <a onClick={::this.handleExternalLink}
              target="_blank"
              href="http://creativecommons.org/licenses/by-nc/4.0/"
            >Attribution-NonCommercial 4.0 International License.</a>
          </p>
        </div>
        <div className={styles.git}>
          <i className={icons.git}></i>
          <p className={styles.oh}>
            Открытый репозиторий на <a href="https://github.com/createspb/product_check" onClick={::this.handleExternalLink} target="_blank">Github</a>
          </p>
        </div>
        <div className={styles.copyright}>
          <p className={styles.oh}>
            {results.from}
            <a
              className={styles.a}
              target="_blank"
              onClick={::this.handleExternalLink}
              href="http://createdigital.me/"
            >{welcome.companyName}</a>
            {results.and}
            <a
              className={styles.a}
              target="_blank"
              href="http://digitalchange.me/"
              onClick={::this.handleExternalLink}
            >{results.companyPartner}</a>
          </p>
        </div>
      </div>
    );
  }

  render() {
    const styles = require('./Results.less');
    const icons = require('../Styles/icons.less');
    const { results } = captions;
    const { feedback } = this.state;
    return (
      <ResultsCarcas ref="carcas">
        <div className={styles.matrix}>
          <h1 className={styles.h1}>
            <i className={icons.results}></i>
            <em ref={(r) => this.h1 = r}>{results.h1}</em>
          </h1>
          <p ref={(r) => this.p = r} className={styles.p}>{results.p}</p>
          <Matrix
            setMatrixResultValue={::this.setMatrixResultValue}
          />
        </div>
        {this.renderNext(styles, icons, results)}
        {this.renderFooter(styles, icons)}
        {feedback &&
          <Feedback handleCloseFeedback={::this.handleCloseFeedback} />
        }
      </ResultsCarcas>
    );
  }

}
