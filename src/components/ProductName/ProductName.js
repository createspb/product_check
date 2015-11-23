import React, { Component, PropTypes } from 'react';
import { Carcas } from '..';
import captions from '../../data/captions';
import { set } from 'redux/modules/productName';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import $ from 'jquery';

@connect(
  state => ({
    productName: state.productName
  }),
  { pushState, set })
export default class ProductName extends Component {

  static propTypes = {
    set: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    questions: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.carcas.bottomToCenter();
    if (window) {
      ga('send', 'event', 'productName'); // eslint-disable-line
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productName.productName) {
      const { carcas } = this.refs;
      carcas.animateToTop(
        () => this.props.pushState(null, '/results')
      );
    }
  }

  handleError() {
    const styles = require('./ProductName.less');
    $(this.input).addClass(styles.error);
  }

  val() {
    return $(this.input).val();
  }

  handleButton(event) {
    event.stopPropagation();
    if (this.val() === '') {
      return this.handleError();
    }
    this.props.set(this.val());
  }

  handleChange() {
    const styles = require('./ProductName.less');
    $(this.input).removeClass(styles.error);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleButton(event);
    }
  }

  render() {
    const icons = require('../Styles/icons.less');
    const styles = require('./ProductName.less');
    const { name } = captions;
    return (
      <Carcas ref="carcas">
        <h2 className={styles.h2}>{name.label}</h2>
        <input
          ref={ref => this.input = ref}
          onKeyPress={::this.handleKeyPress}
          onChange={::this.handleChange}
          type="text"
          className={styles.transparentInput}
        />
        <button
          onClick={::this.handleButton}
          className={styles.transparentButton}
        >
          <i className={icons.yes}></i>
          {name.button}
        </button>
      </Carcas>
    );
  }

}
