import $ from 'jquery';
import React from 'react';
import BaseSite from './BaseSite';

class ToastySite extends BaseSite {
  static defaultProps = {
    displayName: 'ToastySite'
  }

  constructor(props, context) {
    super(props);
    this.context = context;
    this.state = {
      type: this.props.location.query.imageType
    };
  }

  componentWillMount() {
    var cssClass = `toasty ${this.state.type}`;
    this.bindBodyClass(cssClass);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    var template;
    
    if(this.state.type === "start"){
      template = (
        <div className="row">
          <img src="images/start.png" className="animated slideInRight" />
        </div>
      );
    } else {
      template = (
        <div className="row">
          <img src="images/wait.png" className="animated bounce" />
        </div>
      );
    }
      
    return (
      <div className="ui center aligned grid">
        {template}
      </div>
    );
  }
};

ToastySite.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default ToastySite;
