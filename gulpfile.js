'use strict';

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var path = {
    build: {
        html: 'assets/build/',
        js: 'assets/build/js/',
        css: 'assets/build/css/',
        img: 'assets/build/img/',
        fonts: 'assets/build/fonts/',
        icons: 'assets/build/webfonts/',
        spritesvg: 'assets/build/img/'
    },
    src: {
        html: 'assets/src/**/*.html',
        js: 'assets/src/js/main.js',
        style: 'assets/src/scss/main.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/src/fonts/**/*.*',
        icons: 'assets/src/webfonts/**/*.*',
        spritesvg: 'assets/src/img/svg/*.svg'
    },
    watch: {
        html: 'assets/src/**/*.html',
        js: 'assets/src/js/main.js',
        jscommon: 'assets/src/js/common.js',
        css: 'assets/src/scss/**/*.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/srs/fonts/**/*.*',
        icons: 'assets/srs/webfonts/**/*.*',
        spritesvg: 'assets/srs/img/svg/*.svg'
    },
    clean: './assets/build/*'
};
/* настройки сервера */
var config = {
    server: {
        baseDir: './assets/build'
    },
    notify: false
};

/* подключаем gulp и плагины */
var gulp = require('gulp'),  // подключаем Gulp
    concat = require("gulp-concat"),
    babel = require("gulp-babel"),
    minifyCSS = require("gulp-minify-css"),
    htmlmin = require("gulp-htmlmin"),
    clean = require("gulp-clean"),
    webp = require("gulp-webp"),
    svgSprite = require("gulp-svg-sprites"),
    svgmin = require("gulp-svgmin"),
    cheerio = require("gulp-cheerio"),
    replace = require("gulp-replace"),
    connect = require("gulp-connect"),
    hash = require("gulp-hash-filename"),
    htmlreplace = require("gulp-html-replace"),
    ftp = require("vinyl-ftp"),
    gutil = require("gulp-util"),
    fs = require("fs"),
    open = require("gulp-open"),
    webserver = require('browser-sync'), // сервер для работы и автоматического обновления страниц
    plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
    gulpif = require('gulp-if'),
    gcmq = require('gulp-group-css-media-queries'),
    sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
    uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
    cache = require('gulp-cache'), // модуль для кэширования
    imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
    jpegrecompress = require('imagemin-jpeg-recompress'), // плагин для сжатия jpeg
    //pngquant = require('imagemin-pngquant'), // плагин для сжатия png
    rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
    rename = require('gulp-rename');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);

var hashedJS;
var hashedCSS;
/* задачи */

// запуск сервера
gulp.task('webserver', function () {
    webserver(config);
});

// сбор html


gulp.task('html:build', function () {
    return gulp.src(path.src.html) // выбор всех html файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger()) // импорт вложений
        .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
        .pipe(webserver.reload({stream: true})); // перезагрузка сервера
});

// сбор стилей
gulp.task('css:build', function () {
    return gulp.src(path.src.style) // получим main.scss
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(gulpif(isDev, sourcemaps.init())) // инициализируем sourcemap
        .pipe(sass()) // scss -> css
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))// добавим префиксы
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(isProd, cleanCSS({
            level: 2
        }))) // минимизируем CSS
        .pipe(gulpif(isDev, sourcemaps.write())) // записываем sourcemap
        .pipe(gulp.dest(path.build.css)) // выгружаем в build
        .pipe(webserver.reload({stream: true})); // перезагрузим сервер
});

// сбор js
gulp.task('commonjsbabel:build', function () {
    return gulp.src(["./assets/src/js/common.js"]) // получим файл main.js
        .pipe(
            babel({
                presets: ["env"],
            })
        )
        .pipe(uglify())
        .pipe(concat("common.min.js"))
        .pipe(gulp.dest("./assets/src/js/"));
});

gulp.task('js:build', function () {
    return gulp.src([
        "./assets/src/js/main.js"
    ]) // получим файл main.js
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rigger()) // импортируем все указанные файлы в main.js

        .pipe(gulp.dest(path.build.js))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init()) //инициализируем sourcemap
        .pipe(uglify()) // минимизируем js
        .pipe(sourcemaps.write('./')) //  записываем sourcemap
        .pipe(gulp.dest(path.build.js)) // положим готовый файл
        .pipe(webserver.reload({stream: true})); // перезагрузим сервер
});

// перенос шрифтов
gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});
gulp.task('icons:build', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest(path.build.icons)); // выгрузка готовых файлов
});
// обработка картинок  формат webp
gulp.task('imagewebp:build', function () {
    return gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(webp())
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

// обработка картинок
gulp.task('image:build', function () {
    return gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            //pngquant(),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ])))
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

gulp.task("spritesvg:build", function () {
    return gulp.src(path.src.spritesvg)
        .pipe(
            cheerio({
                run: function ($) {
                },
                parserOptions: {xmlMode: true},
            })
        )
        .pipe(replace("&gt;", ">"))
        .pipe(
            svgSprite({
                mode: "symbols",
                preview: false,
                selector: "icon-%f",
                svg: {
                    symbols: "symbol_sprite.html",
                },
            })
        )
        .pipe(
            svgmin({
                plugins: [
                    {removeComments: true},
                    {removeMetadata: true},
                    {removeEditorsNSData: true},
                    {removeAttrs: {attrs: "data.*"}},
                    {removeStyleElement: true},
                    {removeDesc: true},
                    {cleanupIDs: false},
                ],
            })
        )
        // .pipe(gulp.dest("./img/"))
        .pipe(gulp.dest(path.build.spritesvg)) // выгрузка готовых файлов
});

// удаление каталога build
gulp.task('clean:build', function () {
    return gulp.src(path.clean, {read: false})
        .pipe(rimraf());
});

// очистка кэша
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// сборка
gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'js:build',
            'commonjsbabel:build',
            'fonts:build',
            'icons:build',
            'image:build',
            'imagewebp:build',
            'spritesvg:build'
        )
    )
);

// запуск задач при изменении файлов
gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.jscommon, gulp.series('commonjsbabel:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.img, gulp.series('imagewebp:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
    gulp.watch(path.watch.icons, gulp.series('icons:build'));
    gulp.watch(path.watch.spritesvg, gulp.series('spritesvg:build'));
});

// задача по умолчанию
gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver', 'watch')
));
