var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var dom = require('gulp-dom');
var replace = require('gulp-replace');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var bump = require('gulp-bump');

var placeholders = [
    'https://www.here.com/sites/default/files/styles/image_scale_760px_418px/public/media/images/intel%20card01%20D%402x.jpg?itok=VxCZY1sF',
    'https://www.here.com/sites/default/files/styles/image_scale_760px_418px/public/media/images/586x330-SA-DT-%402x.jpg?itok=nR6DEa_h',
    'https://www.here.com/sites/default/files/styles/image_scale_760px_418px/public/media/images/dji%20card01%20D%402x.jpg?itok=slolVoiZ'
];

gulp.task('js-build', function() {
    gulp.src('./src/js/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('css-build', function() {
    gulp.src('./src/css/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(gulp.dest('public/css'))
});

gulp.task('html-build', function(){
    gulp.src('./src/index.html')
        .pipe(dom(function(){
            var script = this.createElement('script');
            script.setAttribute('src', 'js/app.js');
            var css = this.createElement('link');
            css.setAttribute('rel', 'stylesheet');
            css.setAttribute('type', 'text/css');
            css.setAttribute('href', 'css/app.css');
            this.body.appendChild(script);
            this.head.appendChild(css);
            return this;
        }))
        .pipe(replace('//via.placeholder.com/360x198', function() {
            return placeholders.shift();
        }))
        .pipe(gulp.dest('public'))
})

gulp.task('update-version', function() {
    gulp.src('./package.json')
        .pipe(bump({ type: 'minor' }))
        .pipe(gulp.dest('./'))
});

gulp.task('build', ['js-build', 'css-build', 'html-build', 'update-version']);