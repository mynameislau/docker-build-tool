const path = require('path');
const buildToolConfig = require('./config-utils');
const buildToolDir = path.resolve('./');

const dist = buildToolConfig.distDir || 'dist';
const src = buildToolConfig.srcDir || 'src';
const workDir = buildToolConfig.workDir || './';

module.exports = {
  buildToolDir: buildToolDir,
  src: src,
  dist: dist,
  workDir: workDir
};
