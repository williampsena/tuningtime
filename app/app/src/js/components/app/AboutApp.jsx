import React from 'react';
import AboutSite from '../site/AboutSite';

export default class AboutApp extends React.Component {
  static defaultProps = {
    displayName: 'AboutSite'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <AboutSite />
    );
  }
};
