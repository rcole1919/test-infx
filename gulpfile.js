"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("cssmin", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.ico",
      "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css", "cssmin"));
  gulp.watch("source/img/*.svg", gulp.series("refresh"));
  gulp.watch("source/*.html", gulp.series("refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "cssmin"));
gulp.task("start", gulp.series("build", "server"));
