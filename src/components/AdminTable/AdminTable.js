import React, { Component, PropTypes } from 'react';
import captions from '../../data/captions';
import { map } from 'underscore';
// import moment from 'moment';
import { AdminTableRow } from '..';

export default class AdminTable extends Component {

  static propTypes = {
    results: PropTypes.array.isRequired,
    handleOpenResult: PropTypes.func.isRequired,
    handleRemoveResult: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./AdminTable.less');
    const tableCaptions = captions.adminTable;
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{tableCaptions.n}</th>
            <th className={styles.title}>{tableCaptions.title}</th>
            <th>{tableCaptions.date}</th>
            <th className={styles.delete}></th>
          </tr>
        </thead>
        <tbody>
          {map(this.props.results, (result, key) => {
            return (
              <AdminTableRow
                key={key}
                handleOpenResult={this.props.handleOpenResult}
                handleRemoveResult={this.props.handleRemoveResult}
                result={result}
                styles={styles}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

}
