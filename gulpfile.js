var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rigger = require("gulp-rigger");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync").create();
gulp.task("html:build", function () {
    gulp.src("src/**/*.html") //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest("dist/")) //Выплюнем их в папку build
        /*.pipe(reload({stream: true}));*/
        .pipe(server.stream()); //И перезагрузим наш сервер для обновлений
});
 gulp.task("style", function() {
  gulp.src("src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});
 gulp.task("image:build", function () {
    gulp.src("src/img/**/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    /*.pipe(reload({stream: true}));*/
    .pipe(server.stream());
});
 gulp.task("fonts:build", function() {
    gulp.src("src/fonts/*.*")
        .pipe(gulp.dest("dist/fonts"))
});
 gulp.task("serve", ["style"], function() {
  server.init({
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
   gulp.watch("src/less/**/*.less", ["style"]);
  gulp.watch("dist/*.html").on("change", server.reload);
  gulp.watch(["src/**/*.html"], function(event, cb) {
        gulp.start("html:build");
    });
  gulp.watch(["src/fonts/*.*"], function(event, cb) {
        gulp.start("fonts:build");
    });
});
