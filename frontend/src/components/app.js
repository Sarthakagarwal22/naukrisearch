import React from 'react';
import Header from '../containers/header';

export default class App extends React.Component {
  componentWillReceiveProps() {
    window.previousLocation = this.props.location
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}