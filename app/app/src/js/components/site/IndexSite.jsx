import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import { CurrentLanguage } from '../../config/lang';
import MenuBar from './common/MenuBar';
import StatusChart from './index/StatusChart';
import BaseSite from './BaseSite';

import { SettingStore } from '../../stores/SettingStore';

export default class IndexSite extends BaseSite {
  static defaultProps = {
    displayName: 'IndexSite'
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.bindBodyClass('home');
  }

  componentDidMount() {
    super.componentDidMount();
  }

  render() {
    return (
      <div>
        <MenuBar ref="menuBar" visible={true} />
        <div className="ui one column center aligned grid">
          <div className="column ten wide">
            <h4 className="ui horizontal inverted divider">
              {CurrentLanguage.index.title}
            </h4>
          </div>
          <div className="column fifteen wide">
            <Link to="/timer" className="ui circular icon button red massive play-button">
              <i className="power icon"></i>
            </Link>
          </div>
          <div className="column ten wide">
            <h4 className="ui horizontal inverted divider">
              Status
            </h4>
          </div>
          <div className="column fifteen wide">
            <StatusChart />
          </div>
        </div>
      </div>
    );
  }
};
