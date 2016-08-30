import React from 'react';
import ExportSite from '../site/ExportSite';

export default class ExportApp extends React.Component {
  static defaultProps = {
    displayName: 'ExportApp'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <ExportSite />
    );
  }
};
