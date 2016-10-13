'use strict';

const path = require('path');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const mainBowerFiles = require('main-bower-files');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const less = require('gulp-less');
const filter = require('gulp-filter');
const clean = require('gulp-clean');
const shell = require('gulp-shell');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const gulpWebpack = require('gulp-webpack');
const chalk = require('chalk');
const babel = require('gulp-babel');
const debug = require('gulp-debug');
const argv = require('yargs').argv;

function gulpSpawn(tasks, opts, callback) {
  var spawn = require('child_process').spawn;

  opts = opts || {};
  opts.silent = (typeof opts.silent === 'undefined') ? true : opts.silent;
  opts.path = path.resolve(opts.path || './');

  tasks = tasks || ['build'];
  callback = callback || function () { };

  var child = spawn('gulp', tasks, {
    cwd: opts.path
  });

  child.stdout.on('data', (data) => {
    if (data && !opts.silent) {
      console.log(data.toString().replace(/(\r\n|\n|\r)/gm, ""));
    }
  });

  child.on('exit', (code) => {
    callback();
  });
}

function webpackLogger(callback) {
  return function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack] Build success:'.yellow, stats.toString({
      hash: false,
      version: false,
      cached: false,
      colors: true
    }));
    if (callback) {
      callback();
    }
  };
}


gulp.task('default', ['watch']);

gulp.task('watch', () => {
  gutil.log('[watch]');

  runSequence(
    'build',
    [
      'watch-src',
      'watch-vendor'
    ]
    );
});

gulp.task('build', (callback) => {
  runSequence(
    'clean:compile',
    'build-src',
    'build-vendor',
    callback
    );
});

gulp.task('build-src', [
  'build-src:js',
  'build-src:css',
  'build-src:html',
  'build-src:dist'
]);

gulp.task('build-vendor', [
  'build-vendor:js',
  'build-vendor:css',
  'build-vendor:semantic-ui'
]);

gulp.task('watch-src', [
  'watch-src:js',
  'watch-src:css',
  'watch-src:html'
]);

gulp.task('watch-vendor', () => {
  gulp.watch('bower.json'['build-vendor']);
});

gulp.task('watch-src:js', () => {
  gulp.watch(['./src/**/*.js', './src/**/*.es6', './src/**/*.jsx'], function () {
    runSequence(
      'build-src',
      'build-vendor'
      );
  });
});

gulp.task('watch-src:css', () => {
  gulp.watch('./src/less/**/*', ['build-src:css']);
});

gulp.task('watch-src:html', () => {
  gulp.watch('./src/html/**/*', ['build-src:html']);
});

gulp.task('build-src:js', (callback) => {
  return gulp.src('./src/client.jsx')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./compile'));
});

gulp.task('build-src:css', () => {
  return gulp.src('src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('compile'));
});

gulp.task('build-src:html', () => {
  return gulp.src('src/html/main.html')
    .pipe(gulp.dest('compile'));
});

gulp.task('build-src:dist', function () {
  return gulp.src(['src/dist/**/*', 'main.js'])
    .pipe(gulp.dest('compile'));
});

gulp.task('build-vendor:js', () => {
  return gulp.src(mainBowerFiles())
    .pipe(filter(['**/*.js']))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('compile'));
});

gulp.task('build-vendor:css', () => {
  return gulp.src(mainBowerFiles())
    .pipe(filter(['**/*.css']))
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('compile'));
});

gulp.task('build-vendor:semantic-ui', () => {
  return gulp.src('semantic/dist/**/*')
    .pipe(gulp.dest('compile/semantic-ui'));
});

gulp.task('clean:compile', () => {
  return gulp.src('compile')
    .pipe(clean());
});

gulp.task('build-electron', (callback) => {
  runSequence(
    'build',
    'build-electron:clean',
    callback
    );
});

gulp.task('build-electron:clean', () => {
  return gulp.src('Electron.app')
    .pipe(clean());
});

gulp.task('build-electron:src', shell.task([
  'cp -a node_modules/electron-prebuilt/compile/Electron.app ./',
  'mkdir Electron.app/Contents/Resources/app',
  'cp main.js Electron.app/Contents/Resources/app/',
  'cp package.json Electron.app/Contents/Resources/app/'
]));

gulp.task('compile:semantic-ui', (done) => {
  return gulpSpawn(['build'], { silent: false, path: './semantic' }, function () {
    done();
  });
});

gulp.task('debug', (callback) => {
  runSequence(
    'build',
    'debug:electron',
    callback
    );

  runSequence('watch');
});

gulp.task('debug:electron', ['build'], shell.task([
  'npm run dev'
]));

gulp.task('test:build', ['test:clean'], () => {
  return gulp.src(["./src/**/*.js", "./src/**/*.es6", "./test/**/*.js"])
    .pipe(babel())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(debug())
    .pipe(gulp.dest("./built-tests"))
});

gulp.task('test:build-js', ['test:build'], () => {
  return gulp
        .src("built-tests/**/*.es6.js")
        .pipe(rename(function(path) {
          path.basename = path.basename.replace('.es6', '');
          path.extname = '.js';
        }))
        .pipe(gulp.dest('built-tests'));
});

gulp.task('test:clean', [], () => {
  return gulp.src('./built-tests')
    .pipe(clean());
});

gulp.task('test', () => {
  runSequence(['test:mocha']);
});

gulp.task('test:mocha', ['test:build', 'test:build-js'], () => { 
  var args = ['./built-tests', '--renderer'];
  
  if(argv.testcase){
    args.push(`--fgrep=${argv.testcase}`);
  }

  return gulp.src('./built-tests').pipe(shell([

    `electron-mocha ${args.join(' ')}`
  ]));
});

gulp.task('package', (callback) => {
    runSequence(
    'build',
    'package:linux',
    callback
    );
});

gulp.task('package:linux', [], (callback) => {
    runSequence(
    'package:linux-x64',
    'package:linux-ia32',
    'package:linux-appImage',
    callback
    );
});

gulp.task('package:linux-x64', [], shell.task([
  'build --linux deb tar.xz --x64'
]));

gulp.task('package:linux-ia32', [], shell.task([
  'build --linux deb tar.xz --ia32'
]));


gulp.task('package:linux-appImage', [], shell.task([
  'build --linux tar.xz AppImage'
]));