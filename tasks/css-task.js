const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const { streamEnded, namedTask } = require('../utils/build-utils');
const { src, dist } = require('../utils/path-utils');

const distProcessors = [
  autoprefixer(),
  cssnano()
];

const devProcessors = [
  autoprefixer()
];

const compileCSS = async (isDist) => {
  await del(`${dist}/css/*.css`);
  await streamEnded(
    gulp.src(`${src}/scss/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss(isDist ? distProcessors : devProcessors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${dist}/css`))
  );
};

const compileAndWatch = cb => {
  compileCSS(false);
  gulp.watch(`${src}/scss/**/*.scss`, namedTask('compileCss', () => compileCSS(false)));
  cb();
};

module.exports = {
  dev: compileAndWatch,
  dist: () => compileCSS(true),
  name: 'css'
};
