import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { login } from 'redux/modules/auth';
import { pushState } from 'redux-router';

@connect(
  state => ({user: state.auth.user, loginError: state.auth.loginError}),
  {login, pushState})
export default class Login extends Component {

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loginError: PropTypes.bool,
    pushState: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState(null, '/admin');
    } else if (this.props.user && !nextProps.user) {
      this.props.pushState(null, '/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.refs.username;
    const pass = this.refs.password;
    this.props.login(name.value, pass.value);
    name.value = '';
    pass.value = '';
  }

  render() {
    const {user, loginError} = this.props;
    return (
      <div>
        <h2>Login</h2>
        {!user &&
        <div>
          {loginError &&
          <p>Error</p>
          }
          <form onSubmit={::this.handleSubmit}>
            <input type="text" ref="username" placeholder="Enter a username" />
            <input type="password" ref="password" placeholder="Enter a password" />
            <button onClick={::this.handleSubmit}>Log In</button>
          </form>
        </div>
        }
      </div>
    );
  }

}
