import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import BaseSite from './BaseSite';
import MenuBar from './common/MenuBar';

class AboutSite extends BaseSite {
  static defaultProps = {
    displayName: 'AboutSite'
  }

  constructor(props, context) {
    super(props);

    this.context = context;
    this.state = {};
  }

  componentWillMount() {
    this.bindBodyClass('about');
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div>
        <div>
          <MenuBar ref="menuBar" visible={true} />
          <div className="ui one column center aligned grid about-message">
            <div className="column ten wide">
              <h4 className="ui horizontal inverted divider">
                {CurrentLanguage.about.title}
              </h4>
            </div>
            <div className="column fifteen wide">
              <div className="row">
                {CurrentLanguage.about.message}
              </div>
              <br />
              <div className="row">
                <strong>powered by</strong>&nbsp;
                <a href={CurrentLanguage.about.site}>{CurrentLanguage.about.poweredby}</a>
              </div>
              <div className="row">
                <img className="logo-cpdev" src="images/cpdev.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

AboutSite.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default AboutSite;
