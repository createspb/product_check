import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const {user} = this.props;
    return (user &&
      <h2>Login Success</h2>
    );
  }
}
