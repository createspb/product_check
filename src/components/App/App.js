import React, { PropTypes, Component } from 'react';
// import withContext from '../../decorators/withContext';
// import withStyles from '../../decorators/withStyles';

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>App Name</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default App;
