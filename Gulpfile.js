var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var webserver = require("gulp-webserver");
var deleteLines = require('gulp-delete-lines');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['dev-server']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task("dev-server", function() {
    "use strict";

    gulp.src("./app").pipe(webserver({
        open: true,
        livereload: true
    }));
});

gulp.task("cordovaDev", function () {
    "use strict";
    gulp.src(["./app/**/**", "!./app/index.html", "!./app/js/controllers/**"])
            .pipe(gulp.dest("./www/"));

    //Minimizado y procesado de archivo index.html
    gulp.src("./app/index.html")
            .pipe(deleteLines({
                "filters": ["<!-- BEGIN CORDOVA FILES"]
            }))
            .pipe(deleteLines({
                "filters": ["END CORDOVA FILES -->"]
            }))
            .pipe(gulp.dest("www/"));
    
    gulp.src("./app/js/controllers/**.js")
            .pipe(deleteLines({
                "filters": [new RegExp(".*BEGIN CORDOVA FILES.*")]
            }))
            .pipe(deleteLines({
                "filters": [new RegExp(".*END CORDOVA FILES.*")]
            }))
            .pipe(gulp.dest("www/js/controllers/"));
});