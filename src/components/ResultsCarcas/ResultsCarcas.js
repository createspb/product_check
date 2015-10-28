import React from 'react';
import { Carcas } from '..';

export default class ResultsCarcas extends Carcas {

  constructor(props) {
    super(props);
    this.styles = require('./ResultsCarcas.less');
    this.backgroundClass = this.styles.cresults;
    this.wrapClass = this.styles.containerAll;
  }

  renderCell(styles, icons, children) {
    return (
      <div className={styles.containerCell}>
        <div
          ref={(ref) => this.container = ref}
          className={this.wrapClass}
        >
          {children}
        </div>
      </div>
    );
  }

}
