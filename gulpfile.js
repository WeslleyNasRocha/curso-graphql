const gulp = require("gulp");
const cleanDir = require("gulp-clean-dir");
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("scripts", () => {
  const tsResult = tsProject.src().pipe(tsProject());

  return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("static", () => {
  return gulp.src(["src/**/*.json"]).pipe(gulp.dest("dist"))
})

gulp.task("clean", () => {
  return gulp.src("dist").pipe(cleanDir())
})

gulp.task("build", gulp.series([
  'clean',
  'static',
  'scripts'
]))

gulp.task("default", () => {
  return gulp.watch('src', gulp.series([
    'build'
  ]))
})