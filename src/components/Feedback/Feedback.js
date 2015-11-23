import React, { Component } from 'react';
import captions from '../../data/captions';
import { send } from 'redux/modules/feedback';
import { connect } from 'react-redux';

@connect(
  state => ({
    feedback: state.feedback.result,
    error: state.feedback.error
  }),
  { send })
export default class Feedback extends Component {

  static propTypes = {
    handleCloseFeedback: React.PropTypes.func.isRequired,
    send: React.PropTypes.func.isRequired,
    feedback: React.PropTypes.any,
    error: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.styles = require('./Feedback.less');
    this.icons = require('../Styles/icons.less');
    this.state = {
      sended: false,
      animate: false,
      errors: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feedback) {
      this.setState({
        sended: true
      }, () => {
        setTimeout(() => {
          this.setState({
            animate: true
          });
        }, 300);
      });
    }
    if (nextProps.error) {
      this.setError();
    }
  }

  setError() {
    this.setState({
      errors: true
    }, () => {
      setTimeout(() => {
        this.setState({
          errors: false
        });
      }, 1500);
    });
  }

  handleSubmit(event) {
    event.stopPropagation();
    if (this.email.value !== '' && this.textarea.value !== '') {
      this.props.send({
        email: this.email.value,
        text: this.textarea.value,
      });
    } else {
      this.setError();
    }
  }

  renderForm() {
    const { styles, icons } = this;
    const { feedback } = captions;
    const errorClass = this.state.errors ? styles.error : '';
    return (
      <div className={styles.form}>
        <div className={styles.label}>{feedback.label}</div>
        <div className={styles.field}>
          <i className={icons.email}></i>
          <input
            type="email"
            className={[styles.email, errorClass].join(' ')}
            placeholder={feedback.email}
            ref={(ref) => this.email = ref}
          />
        </div>
        <div className={styles.field}>
          <textarea
            className={[styles.textarea, errorClass].join(' ')}
            placeholder={feedback.text}
            ref={(ref) => this.textarea = ref}></textarea>
        </div>
        <div className={styles.footer}>
          <button
            className={styles.button}
            onClick={::this.handleSubmit}
          >{feedback.button}</button>
        </div>
      </div>
    );
  }

  renderSuccess() {
    const { styles, icons } = this;
    const { feedback } = captions;
    const animateClass = this.state.animate ? icons.__animated : '';
    return (
      <div className={styles.form}>
        <div className={styles.label}>{feedback.successLabel}</div>
        <p className={styles.p}>{feedback.successText}</p>
        <i className={[icons.sended, animateClass].join(' ')}></i>
      </div>
    );
  }

  render() {
    const { styles } = this;
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.shadow}
          onClick={this.props.handleCloseFeedback}
        />
        <div className={styles.window}>
          {this.state.sended ?
            this.renderSuccess() :
            this.renderForm()
          }
        </div>
      </div>
    );
  }

}
