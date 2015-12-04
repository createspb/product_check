import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import { ResultsCarcas, AdminTable, AdminResult, AdminSummary } from '..';
import { load, isLoaded, remove } from 'redux/modules/results';
import {
  isLoaded as isLoadedQuestions,
  load as loadQuestions } from 'redux/modules/questions';
import captions from '../../data/captions';
import _ from 'underscore';
import $ from 'jquery';

@connect(
  state => ({
    user: state.auth.user,
    results: state.results.data,
    questions: state.questions.questions
  }),
  { logout, pushState, load, isLoaded,
    isLoadedQuestions, loadQuestions, remove })
export default class Admin extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    questions: PropTypes.object,
    results: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeResultId: false,
      activeResult: false,
      activeSummary: false,
      page: 0,
      countOnPage: 10
    };
  }

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      this.props.pushState(null, '/');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(load()));
    }
    if (!isLoadedQuestions(getState())) {
      promises.push(dispatch(loadQuestions()));
    }
    return Promise.all(promises);
  }

  handleOpenResult(id) {
    this.setState({
      activeResultId: id,
      activeResult: _.where(this.props.results, {id})[0]
    }, () => {
      console.log(this.state);
    });
  }

  handleRemoveResult(id) {
    console.log(id);
    this.props.remove(id);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({
      activeResultId: false,
      activeResult: false,
      activeSummary: false
    });
  }

  handleSummary(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      activeSummary: true
    });
  }

  handlePage(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      page: parseInt($(event.currentTarget).data('id'), 10)
    });
  }

  paginatedResults(page) {
    return _.filter(this.props.results, (e, k) => {
      return k >= (page * this.state.countOnPage) &&
             k < ((page + 1) * this.state.countOnPage);
    });
  }

  renderSubtitle(styles, adminCaptions) {
    const { activeResult, activeSummary } = this.state;
    if (activeResult) {
      return (
        <span className={styles.fade}>
          <em> &rarr; </em>
          {activeResult.productName}
        </span>
      );
    }
    if (activeSummary) {
      return (
        <span className={styles.fade}>
          <em> &rarr; </em>
          {adminCaptions.summary}
        </span>
      );
    }
    return false;
  }

  renderHeader(styles, adminCaptions) {
    const { activeResult, activeSummary } = this.state;
    return (
      <header className={styles.header}>
        <h2 className={styles.h2}>
          {adminCaptions.title}
          {this.renderSubtitle(styles, adminCaptions)}
        </h2>
        {(() => {
          if (!activeResult && !activeSummary) {
            return (
              <div>
                <button
                  className={styles.button}
                  onClick={::this.handleLogout}
                >{adminCaptions.logout}</button>
                <button
                  className={styles.button}
                  onClick={::this.handleSummary}
                >{adminCaptions.summary}</button>
              </div>
            );
          }
        })()}
        {(() => {
          if (activeResult || activeSummary) {
            return (
              <button
                className={styles.button}
                onClick={::this.handleClose}
              >{adminCaptions.close}</button>
            );
          }
        })()}
      </header>
    );
  }

  renderPagination(styles) {
    const pages = _.range(Math.ceil(
      _.size(this.props.results) / this.state.countOnPage
    ));
    if (_.size(pages) === 1) { return false; }
    return (
      <div className={styles.pagination}>
        {_.map(pages, (page, key) => {
          return (
            <a
              data-id={key}
              key={key}
              onClick={::this.handlePage}
              className={
                (key === this.state.page) ?
                styles.paginationActive :
                styles.paginationPassive
              }
              href="#"
            >{page + 1}</a>
          );
        })}
      </div>
    );
  }

  render() {
    const adminCaptions = captions.admin;
    const styles = require('./Admin.less');
    const { activeResult, activeSummary } = this.state;
    return (
      <ResultsCarcas ref="carcas">
        {this.renderHeader(styles, adminCaptions)}
        {!activeResult && !activeSummary &&
          <AdminTable
            handleOpenResult={::this.handleOpenResult}
            handleRemoveResult={::this.handleRemoveResult}
            results={this.paginatedResults(this.state.page)}
          />
        }
        {!activeResult && !activeSummary && this.renderPagination(styles)}
        {activeResult &&
          <AdminResult result={activeResult} />
        }
        {activeSummary &&
          <AdminSummary
            questions={this.props.questions}
            results={this.props.results}
          />
        }
      </ResultsCarcas>
    );
  }

}
