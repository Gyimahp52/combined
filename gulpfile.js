const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const webp = require('gulp-webp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const { exec } = require('child_process');

// Paths to your assets
const paths = {
    images: 'images/**/*.+(png|jpg|jpeg|gif)',
    css: 'css/*.css',
    js: 'js/*.js',
    html: '*.html',
    videos: 'videos/*.mp4'
};

// Optimize and convert images to WebP
gulp.task('images', () => {
    return gulp.src(paths.images)
        .pipe(imagemin([
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ]))
        .pipe(webp())
        .pipe(gulp.dest('images'));
});

// Minify CSS
gulp.task('css', () => {
    return gulp.src(paths.css)
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest('css'));
});

// Minify JavaScript
gulp.task('js', () => {
    return gulp.src(paths.js)
        .pipe(uglify({ mangle: true, compress: true }))
        .pipe(gulp.dest('js'));
});

// Minify HTML
gulp.task('html', () => {
    return gulp.src(paths.html)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
});

// Default task to run all optimizations
gulp.task('default', gulp.parallel('images', 'css', 'js', 'html'));
