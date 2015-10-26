import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';

@connect(
  state => ({user: state.auth.user}),
  { logout, pushState })
export default class Home extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      this.props.pushState(null, '/');
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h2>Admin</h2>
        <button onClick={::this.handleLogout}>Log Out</button>
      </div>
    );
  }

}
