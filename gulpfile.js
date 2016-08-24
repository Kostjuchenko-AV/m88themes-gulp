//"use strict";
//===========================================
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect'),
	prefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	minifyCss  = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps');
//===========================================
gulp.task('connect', function () {
	connect.server({
		root: 'app',
		livereload: true
	})
});
//===========================================
gulp.task('html', function(){
	gulp.src('app/*.html')
		.pipe(connect.reload());
});
//===========================================
gulp.task('scss', function () {
	gulp.src('app/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefixer('last 10 version'))
		.pipe(minifyCss())
		.pipe(rename(function (path) {
			path.extname = ".min.css"
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});
gulp.task('css', function () {
	gulp.src('app/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(prefixer('last 15 version'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});
//===========================================
gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', ['scss'])
	gulp.watch('app/css/**/*.css', ['css'])
	gulp.watch('app/*.html', ['html'])
});
//===========================================
gulp.task('default', ['connect', 'html', 'scss', 'css', 'watch']);