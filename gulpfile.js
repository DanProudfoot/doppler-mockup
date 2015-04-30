var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
// var imgmin = require('gulp-imagemin');
// var resize = require('gulp-image-resize');
var changed = require('gulp-changed');
var parallel = require('concurrent-transform');
var os = require('os');
var rename = require('gulp-rename');

var config = {
  sass: './css/style.scss',
  images: './assets/*.{png,jpg,jpeg}',
  build: './css/built'
}


gulp.task('sass', function(){
  return sass(config.sass)
  .pipe(prefix({
    browsers: ['last 2 versions'],
    cascade: true
  }))
  .pipe(csso())
  .pipe(gulp.dest( config.build ));
});

// gulp.task('image-hd', function(){
//   return gulp.src(config.images)
//   .pipe(changed(config.build + '/assets'))
//   .pipe(parallel(
//     resize({
//       width: 1920
//     }),
//     imgmin({
//       progressive: true
//     }),
//     os.cpus().length
//   ))
//   .pipe(rename(function(path) { path.basename += '-hd'; }))
//   .pipe(gulp.dest( config.build + '/assets'));
// });

// gulp.task('image-thumbnails', function(){
//   return gulp.src(config.images)
//   .pipe(changed(config.build + '/assets'))
//   .pipe(parallel(
//     resize({
//       width: 150,
//       height: 150,
//       crop: true,
//       gravity: 'Center'
//     }),
//     imgmin({
//       progressive: true
//     }),
//     os.cpus().length
//   ))
//   .pipe(rename(function(path) { path.basename += '-thumbnail'; }))
//   .pipe(gulp.dest( config.build + '/assets'));
// });

// gulp.task('images', ['image-hd','image-thumbnails']);

// gulp.task('build', ['sass','images']);

gulp.task('watch', function(){
  gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);