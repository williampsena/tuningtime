import s from '../../node_modules/semantic-ui/dist/semantic.js';

import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { createHistory } from 'history'
import routes from './routes';
import { SettingStore } from './stores/SettingStore';

render(
  <Router history={hashHistory} routes={routes}>
  </Router>,
  document.getElementById('app')
);

SettingStore.preload();



