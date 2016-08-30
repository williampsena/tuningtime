import React from 'react';
import TimerSite from '../site/TimerSite';

export default class TimerApp extends React.Component {
  static defaultProps = {
    displayName: 'TimerSite'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <TimerSite />
    );
  }
};
