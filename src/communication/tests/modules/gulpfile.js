var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    runSequence = require("run-sequence"),
    browserSync = require('browser-sync').create();

gulp.task("lint", function () {
    return gulp.src([
        "bib/**.ts",
        "client/**.ts",
        "serveur/**.test.ts"
    ])
        .pipe(tslint({}))
        });


var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build-app", function () {
    return gulp.src([
        "bib/**.ts",
        "serveur/**.ts"
    ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("js"));
});

gulp.task("bundle", function () {

    var libraryName = "appNav";
    var mainTsFilePath = "client/vue.js";
    var outputFolder = "js/";
    var outputFileName = libraryName + ".js";

    var bundler = browserify({
        debug: true,
        standalone: libraryName
    });

    return bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));
});

