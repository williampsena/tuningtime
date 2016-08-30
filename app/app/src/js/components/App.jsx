import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class App extends React.Component {

  static defaultProps = {
    displayName: 'App'
  }
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.adjustHeightForBeauty();
  }

  render() {
    return (
      <div className="site">        
        <div className="main-container" ref="main">
          {this.props.children}
        </div>
      </div>
    );
  }

  adjustHeightForBeauty() {
    let mainSectionHeight = $(window).height();
    $(ReactDOM.findDOMNode(this.refs.main)).css('min-height', mainSectionHeight);
  }
};
