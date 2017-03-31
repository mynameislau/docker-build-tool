const gulp = require('gulp');
const { src, dist } = require('../utils/path-utils');
const { streamEnded, namedTask } = require('../utils/build-utils');
const del = require('del');
const rename = require('gulp-rename');
const handlebars = require('gulp-hb');

const compileTemplates = async () => {
  await del(`${dist}/html/*`);

  await streamEnded(
    gulp.src(`${src}/templates/pages/*.hbs`)
    .pipe(
      handlebars()
      .partials(`${src}/templates/partials/*.hbs`)
      .partials(`${src}/templates/layouts/*.hbs`)
      .helpers(`${src}/templates/helpers/*.js`)
      .data({})
    )
    .pipe(rename(path => path.extname = '.html'))
    .pipe(gulp.dest(`${dist}/html/`))
  );
};

const compileTemplatesAndWatch = cb => {
  compileTemplates();
  gulp.watch(`${src}/templates/*`, compileTemplates);
  cb();
}

module.exports = {
  dev: compileTemplatesAndWatch,
  dist: compileTemplates,
  name: 'templating'
};
