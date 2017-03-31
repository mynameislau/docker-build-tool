const path = require('path');
const pathUtils = require('./utils/path-utils');

process.stdout.write(path.resolve(pathUtils.workDir, pathUtils.src));

process.exit(1);
