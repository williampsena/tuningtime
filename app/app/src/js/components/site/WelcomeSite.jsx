import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import db from '../../stores/StoreContext';

import SettingModel from '../../models/Setting';
import MenuBar from './common/MenuBar';
import BaseSite from './BaseSite';

class WelcomeSite extends BaseSite {
  static defaultProps = {
    displayName: 'WelcomeSite'
  }

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    this.bindBodyClass('welcome');
  }

  componentDidMount() {
    super.componentDidMount();
    this.init();
  }

  init(){
    var setting = db.stores.setting.current();

    if(setting) {
      return this.goHome();
    }

    db.stores.setting.preload().then(setting => {
      setTimeout(() => { 
        this.goHome();
      }, 1000);
    }).catch(err => {
      throw err;
    });
  }

  goHome(){
    this.context.router.push('/home');
  }

  render() {
    return (
      <div>
        <div className="ui one column center aligned grid">
          <div className="column fifteen wide">
            <img src="images/logo.png" className="logo" />
          </div>
          <div className="column fifteen wide">
            <div className="ui black massive label welcome-header">
              {CurrentLanguage.welcome.title}
            </div>
            <p>{CurrentLanguage.welcome.loading}</p>
          </div>
          <div className="column fifteen wide welcome-loading">
            <div className="ui active inline large loader"></div>
          </div>
        </div>
      </div>
    );
  }
};

WelcomeSite.contextTypes = {
  router: () => React.PropTypes.func.isRequired
};

export default WelcomeSite;