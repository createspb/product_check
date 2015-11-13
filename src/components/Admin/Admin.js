import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import { ResultsCarcas, AdminTable, AdminResult } from '..';
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
    results: state.results.data
  }),
  { logout, pushState, load, isLoaded,
    isLoadedQuestions, loadQuestions, remove })
export default class Admin extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    results: PropTypes.array,
    pushState: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeResultId: false,
      activeResult: false,
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
      // callback
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
      activeResult: false
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

  renderHeader(activeResult, styles, adminCaptions) {
    return (
      <header className={styles.header}>
        <h2 className={styles.h2}>
          {adminCaptions.title}
          {activeResult &&
            <span className={styles.fade}>
              <em> &rarr; </em>
              {activeResult.productName}
            </span>
          }
        </h2>
        {!activeResult &&
          <button
            className={styles.button}
            onClick={::this.handleLogout}
          >{adminCaptions.logout}</button>
        }
        {activeResult &&
          <button
            className={styles.button}
            onClick={::this.handleClose}
          >{adminCaptions.close}</button>
        }
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
    const { activeResult } = this.state;
    return (
      <ResultsCarcas ref="carcas">
        {this.renderHeader(activeResult, styles, adminCaptions)}
        {!activeResult &&
          <AdminTable
            handleOpenResult={::this.handleOpenResult}
            handleRemoveResult={::this.handleRemoveResult}
            results={this.paginatedResults(this.state.page)}
          />
        }
        {!activeResult && this.renderPagination(styles)}
        {activeResult &&
          <AdminResult result={activeResult} />
        }
      </ResultsCarcas>
    );
  }

}
