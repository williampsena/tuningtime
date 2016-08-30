import React from 'react';
import ToastySite from '../site/ToastySite';

export default class ToastyApp extends React.Component {
  static defaultProps = {
    displayName: 'ToastySite'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <ToastySite location={this.props.location} />
    );
  }
};
