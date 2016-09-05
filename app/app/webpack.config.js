'use strict';


var _ = require('underscore');
var pkg = require('./package.json');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  resolve: {
    modulesDirectories: ['src/js', 'src/less/'],
    extensions: ['', '.es6.js', '.js', '.jsx', '.less'],
  },
  entry: {
    'client': './src/js/client'
  },
  output: {
    path: '/dist/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  target: 'atom',
  externals: _.keys(pkg.dependencies),
  module: {
    loaders: [
      { test: /\.es6.js$/, loader: 'babel' },
      { test: /\.jsx$/, loader: 'babel' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'jQuery': 'jquery',
      'jquery': 'jquery',
      $: "jquery",
      'nedb': 'nedb'
    })
  ]
}

