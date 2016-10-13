import React from 'react';
import WelcomeSite from '../site/WelcomeSite';

export default class WelcomeApp extends React.Component {
  static defaultProps = {
    displayName: 'WelcomeSite'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <WelcomeSite location={this.props.location} />
    );
  }
};
