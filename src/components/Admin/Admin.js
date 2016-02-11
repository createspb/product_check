import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import { ResultsCarcas, AdminTable, AdminResult, AdminSummary,
  AdminSubscribes } from '..';
import { load, isLoaded, remove } from 'redux/modules/results';
import {
  load as loadSubscribes,
  isLoaded as isLoadedSubscribes,
  remove as removeSubscribe } from 'redux/modules/subscribes';
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
    questions: state.questions.questions,
    subscribes: state.subscribes.data
  }),
  { logout, pushState, load, isLoaded,
    isLoadedQuestions, loadQuestions, remove,
    loadSubscribes, isLoadedSubscribes, removeSubscribe })

export default class Admin extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    questions: PropTypes.object,
    results: PropTypes.array,
    subscribes: PropTypes.array,
    removeSubscribe: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      activeResultId: false,
      activeResult: false,
      activeSummary: false,
      activeSubscribes: false,
      resultsPage: 0,
      subscribesPage: 0,
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

    if (!isLoadedSubscribes(getState())) {
      promises.push(dispatch(loadSubscribes()));
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

  handleRemoveSubscribe(id) {
    this.props.removeSubscribe(id);
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
      activeSummary: false,
      activeSubscribes: false
    });
  }

  handleSummary(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      activeSummary: true
    });
  }

  handleSubscribes(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      activeSubscribes: true
    });
  }

  handleResultsPage(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      resulstsPage: parseInt($(event.currentTarget).data('id'), 10)
    });
  }

  handleSubscribesPage(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      subscribesPage: parseInt($(event.currentTarget).data('id'), 10)
    });
  }

  paginatedResults(page) {
    return _.filter(this.props.results, (e, k) => {
      return k >= (page * this.state.countOnPage) &&
             k < ((page + 1) * this.state.countOnPage);
    });
  }

  paginatedSubscribes(page) {
    return _.filter(this.props.subscribes, (e, k) => {
      return k >= (page * this.state.countOnPage) &&
             k < ((page + 1) * this.state.countOnPage);
    });
  }

  renderSubtitle(styles, adminCaptions) {
    const { activeResult, activeSummary, activeSubscribes } = this.state;
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
    if (activeSubscribes) {
      return (
        <span className={styles.fade}>
          <em> &rarr; </em>
          {adminCaptions.subscribes}
        </span>
      );
    }
    return false;
  }

  renderHeader(styles, adminCaptions) {
    const { activeResult, activeSummary, activeSubscribes } = this.state;

    return (
      <header className={styles.header}>
        <h2 className={styles.h2}>
          {adminCaptions.title}
          {this.renderSubtitle(styles, adminCaptions)}
        </h2>
        {(() => {
          if (!activeResult && !activeSummary && !activeSubscribes) {
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
                <button
                  className={styles.button}
                  onClick={::this.handleSubscribes}
                >{adminCaptions.subscribes}</button>
              </div>
            );
          }
        })()}
        {(() => {
          if (activeResult || activeSummary || activeSubscribes) {
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

  renderResultsPagination(styles) {
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
              onClick={::this.handleResultsPage}
              className={
                (key === this.state.resultsPage) ?
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

  renderSubscribesPagination(styles) {
    const pages = _.range(Math.ceil(
      _.size(this.props.subscribes) / this.state.countOnPage
    ));
    if (_.size(pages) === 1) { return false; }
    return (
      <div className={styles.pagination}>
        {_.map(pages, (page, key) => {
          return (
            <a
              data-id={key}
              key={key}
              onClick={::this.handleSubscribesPage}
              className={
                (key === this.state.subscribesPage) ?
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
    const { activeResult, activeSummary, activeSubscribes } = this.state;

    return (
      <ResultsCarcas ref="carcas">
        {this.renderHeader(styles, adminCaptions)}

        {!activeResult && !activeSummary && !activeSubscribes &&
          <AdminTable
            handleOpenResult={::this.handleOpenResult}
            handleRemoveResult={::this.handleRemoveResult}
            results={this.paginatedResults(this.state.resultsPage)}
          />
        }

        {!activeResult && !activeSummary && !activeSubscribes
        && this.renderResultsPagination(styles)}

        {activeResult &&
          <AdminResult result={activeResult} />
        }

        {activeSummary &&
          <AdminSummary
            questions={this.props.questions}
            results={this.props.results}
          />
        }

        {!activeResult && !activeSummary && activeSubscribes &&
          <AdminSubscribes
            subscribes = {this.paginatedSubscribes(this.state.subscribesPage)}
            handleRemoveSubscribe = {::this.handleRemoveSubscribe}
            subscribesFull = {this.props.subscribes}
          />
        }

        {!activeResult && !activeSummary && activeSubscribes
        && this.renderSubscribesPagination(styles)}

      </ResultsCarcas>
    );
  }

}
