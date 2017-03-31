const gulp = require('gulp');
const path = require('path');
const cssLinter = require('gulp-stylelint');
const { src, buildToolDir } = require('../utils/path-utils');
const { namedTask } = require('../utils/build-utils');

const lintCSS = isDist => namedTask('linting css', () =>
  gulp.src(`${src}/scss/**/*.scss`)
  .pipe(cssLinter({
    failAfterError: isDist,
    configBasedir: buildToolDir,
    configFile: path.resolve(buildToolDir, '.stylelintrc'),
    reporters: [{
      formatter: 'string',
      console: true
    }]
  })));


const lintAndWatch = cb => {
  lintCSS();
  gulp.watch(`${src}/scss/**/*.scss`, lintCSS(false));
  cb();
};

module.exports = {
  dev: lintAndWatch,
  dist: lintCSS(true),
  name: 'linter'
};
