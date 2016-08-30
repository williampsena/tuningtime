import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import MenuBar from './common/MenuBar';
import { SettingStore } from '../../stores/SettingStore';

const shell = require('electron').shell;

export default class BaseSite extends React.Component {
  constructor(props) {
    super(props);
    this.setting = SettingStore.current();
  }
  
  componentDidMount(){
    $('a[href^="http://"]').unbind('click.site').bind('click.site', (e) => {
      this.openBrowser(e);
    });
  }
  
  bindBodyClass(className) {
    $('body').attr('class', className);
    $('.main-container').attr('class', 'main-container');
  }

  openBrowser(event) {
     event.preventDefault();
     shell.openExternal(event.target.href);
  }
 
  render() {
    return (
      <div>
        Not implemented
      </div>
    );
  }
};
