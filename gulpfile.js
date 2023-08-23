// 'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpRename = require('gulp-rename');
const gulpMin = require('gulp-minify');

gulp.task('sass', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulpMin())
        .pipe(gulpRename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
})

gulp.task('watch', function () {
    
    gulp.watch('./src/scss/*.scss', { delay: 10 } ,gulp.series('sass'));
})


