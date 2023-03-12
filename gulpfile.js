/* eslint-disable import/extensions */
import gulp from 'gulp';
import path from './gulp/config/path.js';
import plugins from './gulp/config/plugins.js';

import copy from './gulp/tasks/copy.js';
import reset from './gulp/tasks/reset.js';
import html from './gulp/tasks/html.js';
import server from './gulp/tasks/server.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/js.js';

global.app = {
  path,
  gulp,
  plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
}

const mainTasks = gulp.parallel(copy, html, scss, js);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);

// const { src, dest, watch } = require('gulp');
// const ghPages = require('gh-pages');
// const sass = require('gulp-sass')(require('sass'));
// const browserSync = require('browser-sync').create();

// const buildSass = () => src('src/sass/app.scss')
//   .pipe(sass())
//   .pipe(dest('build/css/'))
//   .pipe(browserSync.stream());

// const browserSyncJob = () => {
//   browserSync.init({
//     server: 'src/',
//   });

//   watch('src/sass/*.scss', buildSass);
// };

// const deployToPages = () => ghPages.publish('src', (err) => {});

// exports.build = buildSass;
// exports.server = browserSyncJob;
// exports.deploy = deployToPages;
