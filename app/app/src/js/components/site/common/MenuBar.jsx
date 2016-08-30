import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class MenuBar extends React.Component {
  constructor(props, context) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  toggleSidebar() {
    var bar = this.getSidebar();
    bar.sidebar({
      overlay: true
    }).sidebar('toggle');
  }

  hideSidebar() {
    var bar = this.getSidebar();
    bar.sidebar({
      overlay: true
    }).sidebar('hide');
  }

  getSidebar() {
    return $(ReactDOM.findDOMNode(this.refs.bar));
  }

  componentDidMount() {
    $('.ui.sidebar')
      .sidebar({
        exclusive: true
      });
  }

  render() {
    var template;

    if (this.props.visible === true) {
      template = (
        <div>
          <div className="ui top fixed compact menu inverted">
            <Link to="/" className="item logo">
              <img src="images/icon.png" />
            </Link>
            <Link to="/export" className="item">
              <i className="download icon"></i>
            </Link>
            <Link to="/taskManagement" className="item">
              <i className="search icon"></i>
            </Link>
            <Link to="/setting" className="item">
              <i className="setting icon"></i>
            </Link>
            <Link to="/about" className="item">
              <i className="help icon"></i>
            </Link>
          </div>
        </div>
      );
    }

    return template;
  }
};

MenuBar.contextTypes = {
  router: React.PropTypes.object
};

export default MenuBar;