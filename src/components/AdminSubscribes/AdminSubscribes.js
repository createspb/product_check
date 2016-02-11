import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import captions from '../../data/captions';

export default class Admin extends Component {

  static propTypes = {
    subscribes: PropTypes.array,
    handleRemoveSubscribe: PropTypes.func,
    subscribesFull: PropTypes.array
  }

  csvData() {
    if (this.props.subscribesFull && this.props.subscribesFull.length > 0) {
      const csvContent = _.map(this.props.subscribesFull, (item) => {
        return (
          item.email
        );
      }).toString();

      return ('data:attachment/csv,' + encodeURI(csvContent));
    }
  }

  downloadCsv() {
    ReactDOM.findDOMNode(this.refs.download).click();
  }

  renderItem(elem, index, styles) {
    const icons = require('../Styles/icons.less');

    return (
      <tr key={elem.id}>
        <td className={styles.idCol}>{elem.id}</td>
        <td className={styles.emailCol}>{elem.email}</td>
        <td className={styles.delCol}>
          <a href="#"
          onClick={this.props.handleRemoveSubscribe.bind(null, elem.id)}>
            <i className={icons.remove}></i>
          </a>
        </td>
      </tr>
    );
  }

  render() {
    const styles = require('./AdminSubscribes.less');
    const { subscribes } = this.props;
    const tableCaptions = captions.adminTable;

    return (
      <div className={styles.tablesWrapper}>
        <table>
          <thead>
            <tr>
              <th className = {styles.idCol}>{tableCaptions.n}</th>
              <th className = {styles.emailCol}>{tableCaptions.email}</th>
              <th className = {styles.delCol}>
                <a ref = {'download'} href = {::this.csvData()}
                download = {'emails_list.csv'}></a>
                <a onClick = {::this.downloadCsv}>{'Скачать'}</a>
              </th>
            </tr>
          </thead>
          <tbody>
            {_.map(subscribes, (elem, index) =>
              this.renderItem(elem, index, styles))
            }
          </tbody>
        </table>
      </div>
    );
  }

}
