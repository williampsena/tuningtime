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
      type: this.props.location.query.imageType || 'start'
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
          <img className="ui centered fluid image animated slideInRight" src="images/start.png" />
      );
    } else {
      template = (
          <img className="ui centered fluid image animated bounce" src="images/wait.png" />
      );
    }
      
    return (
      <div className="ui basic segment">
        {template}
      </div>
    );
  }
};

ToastySite.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default ToastySite;
