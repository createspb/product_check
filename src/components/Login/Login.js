import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { login } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import { Carcas } from '..';
import captions from '../../data/captions';

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

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
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
    const styles = require('./Login.less');
    const {user, loginError} = this.props;
    const loginCaptions = captions.login;
    return (
      <Carcas ref="carcas">
        <h2 className={styles.h2}>Вход</h2>
        {!user &&
        <div>
          {loginError &&
          <p className={styles.error}>{loginCaptions.error}</p>
          }
          <form onSubmit={::this.handleSubmit}>
            <input
              type="text"
              ref="username"
              placeholder={loginCaptions.placeholderName}
              className={styles.transparentInput}
            />
            <input
              type="password"
              ref="password"
              placeholder={loginCaptions.placeholderPass}
              className={styles.transparentInput}
            />
            <button
              onClick={::this.handleSubmit}
              className={styles.transparentButton}
            >{loginCaptions.button}</button>
          </form>
        </div>
        }
      </Carcas>
    );
  }

}
