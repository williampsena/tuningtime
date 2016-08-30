import React from 'react';
import IndexSite from '../site/IndexSite';

export default class IndexApp extends React.Component {
  static defaultProps = {
    displayName: 'IndexSite'
  }
  
  constructor(props, context) {
    super(props);
  }
  
  render() {
    return (
      <IndexSite />
    );
  }
};
