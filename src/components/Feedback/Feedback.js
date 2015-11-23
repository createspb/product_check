import React, {Component} from 'react';
import captions from '../../data/captions';

export default class Feedback extends Component {

  static propTypes = {
    handleCloseFeedback: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.styles = require('./Feedback.less');
    this.icons = require('../Styles/icons.less');
    this.state = {
      sended: false
    };
  }

  handleSubmit(event) {
    event.stopPropagation();
  }

  renderForm() {
    const { styles, icons } = this;
    const { feedback } = captions;
    return (
      <div className={styles.form}>
        <div className={styles.label}>{feedback.label}</div>
        <div className={styles.field}>
          <i className={icons.email}></i>
          <input type="email" placeholder={feedback.email} />
        </div>
        <div className={styles.field}>
          <textarea placeholder={feedback.text}></textarea>
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
    return (
      <div>
        Успех
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
