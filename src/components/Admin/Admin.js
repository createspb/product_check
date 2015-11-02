import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import { ResultsCarcas, AdminTable, AdminResult } from '..';
import { load, isLoaded } from 'redux/modules/results';
import {
  isLoaded as isLoadedQuestions,
  load as loadQuestions } from 'redux/modules/questions';
import captions from '../../data/captions';
import _ from 'underscore';

@connect(
  state => ({
    user: state.auth.user,
    results: state.results.data
  }),
  { logout, pushState, load, isLoaded, isLoadedQuestions, loadQuestions })
export default class Admin extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    results: PropTypes.array,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeResultId: false,
      activeResult: false
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
            results={this.props.results}
          />
        }
        {activeResult &&
          <AdminResult result={activeResult} />
        }
      </ResultsCarcas>
    );
  }

}
