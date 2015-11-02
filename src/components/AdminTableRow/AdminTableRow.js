import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';
import moment from 'moment';

export default class AdminTable extends Component {

  static propTypes = {
    result: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    handleOpenResult: PropTypes.func.isRequired
  };

  handleOpenResult(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.handleOpenResult(this.props.result.id);
    return false;
  }

  render() {
    const { styles, result } = this.props;
    const createdAt = moment(result.createdAt);
    return (
      <tr onClick={::this.handleOpenResult}>
        <td className={styles.id}>{result.id}</td>
        <td>
          <a
            className={styles.a}
            href=""
          >{result.productName}</a>
        </td>
        <td className={styles.date}>{createdAt.format(captions.dateFormats.std)}</td>
      </tr>
    );
  }

}
