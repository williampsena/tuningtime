import React from 'react';
import SettingSite from '../site/SettingSite';

export default class SettingApp extends React.Component {
  static defaultProps = {
    displayName: 'SettingApp'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <SettingSite />
    );
  }
};
