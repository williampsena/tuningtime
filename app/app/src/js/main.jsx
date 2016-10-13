import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { createHistory } from 'history'
import routes from './routes';

render(
  <Router history={hashHistory} routes={routes}>
  </Router>,
  document.getElementById('app')
);



