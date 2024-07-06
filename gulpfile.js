import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpPug from 'gulp-pug';
import minify from 'gulp-minify';
import rename from 'gulp-rename';
// import * as sass from 'sass';

const sass = gulpSass(dartSass);

gulp.task('sass', () => {
    return gulp
        .src('./frontend/gulp/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./frontend/public/style'));
});

gulp.task('js', () => {
    return gulp
        .src('./frontend/gulp/js/**/*.js')
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                noSource: true,
                ignoreFiles: ['-min.js'],
            }),
        )
        .pipe(gulp.dest('./frontend/public/js'));
});

gulp.task('pug', () => {
    return gulp
        .src('./frontend/gulp/pug/*.pug')
        .pipe(gulpPug({ pretty: true }))
        .pipe(gulp.dest('./frontend/public'));
});

gulp.task('build', gulp.series('sass', 'js', 'pug'));

gulp.task('watch', () => {
    gulp.watch('./frontend/gulp/sass/**/*.scss', gulp.series('build'));
    gulp.watch('./frontend/gulp/js/**/*.js', gulp.series('build'));
    gulp.watch('./frontend/gulp/pug/**/*.pug', gulp.series('build'));
});
