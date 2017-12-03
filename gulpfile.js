var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require("gulp-clean");
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("tsconfig.json");
const STATIC_FILES = ['src/*.json', 'src/**/*.json', 'package.json', 'src/**/*.tpl', 'src/**/*.css'];

gulp.task("scripts", function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write("./")) // Now the sourcemaps are added to the .js file
    .pipe(gulp.dest("dist"));
});

gulp.task('public', function () {
  return gulp.src('./src/public/**')
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('views', function() {
  return gulp.src('./src/views/**')
    .pipe(gulp.dest('./dist/views/'));
});

gulp.task('static', function() {
  return gulp.src(STATIC_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('watch-ts', ['scripts'], () => {
  gulp.watch(['src/**/*.ts'], ['scripts']);
});
gulp.task('watch-static', ['scripts'], () => {
  gulp.watch(STATIC_FILES, ['static']);
});
gulp.task('watch-views', ['scripts'], () => {
  gulp.watch(['src/views/*'], ['views']);
});
gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});
gulp.task('default', ['watch-ts', 'watch-static', 'watch-views','public', 'views', 'static', 'scripts']);
gulp.task('build', ['public', 'views', 'static', 'scripts']);
