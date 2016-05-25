var gulp = require('gulp');
var sequence = require('gulp-sequence');
var del = require('del');
var nunjucksRender = require('gulp-nunjucks-render');
var markdown = require('gulp-markdown');
var bsync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
             .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  return gulp.src('src/css/**/*.css')
             .pipe(cleanCSS({compatibility: 'ie8'}))
             .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
             .pipe(gulp.dest('dist/img'));
});

gulp.task('posts', function() {
  return gulp.src('src/posts/**/*.md')
             .pipe(markdown())
             .pipe(htmlmin({collapseWhitespace: true}))
             .pipe(gulp.dest('dist/blog'));
});

gulp.task('serve', function() {
  return bsync({server:{baseDir:"dist"}});
  });

gulp.task('pages', function() {
  return gulp.src("src/pages/**/*.html")
             .pipe(nunjucksRender({
               path: 'src/templates'
             }))
             .pipe(htmlmin({collapseWhitespace: true}))
             .pipe(gulp.dest('dist'));
});

gulp.task('default', sequence('clean', 'css', 'js', 'img', 'posts', 'pages', 'serve'));
