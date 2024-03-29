"use_strict";

const {src, dest} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const del = require("del");
const rigger = require("gulp-rigger");

// Paths
const srcPath = "src/";
const distPath = "dist/";

const paths = {
    build: {
        html: distPath,
        css: `${distPath}assets/css/`,
        js: `${distPath}assets/js/`,
        images: `${distPath}assets/images/`,
        fonts: `${distPath}assets/fonts/`,
    },
    src: {
        html: `${srcPath}*.html`,
        css: `${srcPath}assets/scss/**/*.scss`,
        js: `${srcPath}assets/js/**/*.js`,
        images: `${srcPath}assets/images/**/*.{jpg,jpeg,png,gif,svg,webp,ico}`,
        fonts: `${srcPath}assets/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    },
    watch: {
        html: `${srcPath}**/*.html`,
        css: `${srcPath}assets/scss/**/*.scss`,
        js: `${srcPath}assets/js/**/*.js`,
        images: `${srcPath}assets/images/**/*.{jpg,jpeg,png,gif,svg,webp,ico}`,
        fonts: `${srcPath}assets/fonts/**/*.{eot,svg,ttf,woff,woff2}`,
    },
    clean: `./${distPath}`,
}


// Tasks
function serve() {
    browserSync.init({
        server: {
            baseDir: './' + distPath,
        }
    });
}

function html() {
    return src(paths.src.html, { base: srcPath })
        .pipe(plumber())
        .pipe(dest(paths.build.html))
        .pipe(browserSync.reload({ stream: true }));
}

function css() {
    return src(paths.src.css, { base: srcPath + "assets/scss/" })
        .pipe(plumber({
            errorHandler(err) {
                notify.onError({
                    title:   "SCSS Error",
                    message: "Error: <%= error.message %>",
                })(err);
                this.emit("end");
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(paths.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(paths.build.css))
        .pipe(browserSync.reload({ stream: true }));
}

function js() {
    return src(paths.src.js, { base: srcPath + "assets/js/" })
        .pipe(plumber({
            errorHandler(err) {
                notify.onError({
                    title:   "JS Error",
                    message: "Error: <%= error.message %>",
                })(err);
                this.emit("end");
            }
        }))
        .pipe(rigger())
        .pipe(dest(paths.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(paths.build.js))
        .pipe(browserSync.reload({ stream: true }));
}

function images() {
    return src(paths.src.images, { base: srcPath + "assets/images/" })
        .pipe(webp())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 55, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(paths.build.images))
        .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
    return src(paths.src.fonts, { base: srcPath + "assets/fonts/" })
        .pipe(browserSync.reload({ stream: true }));
}

function clean() {
    return del(paths.clean);
}

function watchFiles() {
    gulp.watch([paths.watch.html], html); // [path], task
    gulp.watch([paths.watch.css], css);
    gulp.watch([paths.watch.js], js);
    gulp.watch([paths.watch.images], images);
    gulp.watch([paths.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;