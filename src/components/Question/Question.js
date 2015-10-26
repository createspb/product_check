import React, { Component, PropTypes } from 'react';

export default class Question extends Component {

  static propTypes = {
    params: PropTypes.object
  };

  render() {
    const { questionId } = this.props.params;
    return (
      <div>
        <h2>Question {questionId}</h2>
      </div>
    );
  }

}
