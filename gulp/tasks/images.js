const images = () => global.app.gulp.src(global.app.path.src.images)
  .pipe(global.app.plugins.plumber(
    global.app.plugins.notify.onError({
      title: 'IMAGES',
      message: 'Error: <%= error.message %>',
    }),
  ))
  .pipe(global.app.plugins.replace(/@img\//g, 'img/'))
  .pipe(global.app.gulp.dest(global.app.path.build.images))
  .pipe(global.app.plugins.browserSync.stream());

export default images;
