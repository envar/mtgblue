var declare = require('gulp-declare');
var del = require('del');
var concat = require('gulp-concat');
var handlebars = require('gulp-handlebars');
var gulp = require('gulp');
var merge = require('merge-stream');
var path = require('path');
var wrap = require('gulp-wrap');

gulp.task('clean', function(cb) {
    del('public/', cb);
});

gulp.task('templates', function() {
    // Assume all partials start with an underscore
    // You could also put them in a folder such as source/templates/partials/*.hbs
    var partials = gulp.src(['src/templates/partials/*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js'));
                }
            }
        }));

    var templates = gulp.src(['src/templates/*.hbs', '!src/templates/partials/*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

    // Output both the partials and the templates as build/js/templates.js
    return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('lint', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src(['src/js/models/*.js', 'src/js/collections/*.js', 'src/js/controllers/*.js', 'src/js/views/*.js', 'src/js/routes/*.js', 'src/js/app.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('copy', function() {
    gulp.src(['src/index.html', 'src/404.html'])
        .pipe(gulp.dest('public/'));

    gulp.src('src/css/*.css')
        .pipe(gulp.dest('public/css/'));

    gulp.src('src/images/*')
        .pipe(gulp.dest('public/images/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/templates/**/*.hbs'], ['templates']);
    gulp.watch(['src/js/**/*.js'], ['scripts']);
    gulp.watch(['src/index.html', 'src/404.html', 'src/css/*.css'], ['copy']);
});

gulp.task('default', ['templates', 'scripts', 'copy']);
