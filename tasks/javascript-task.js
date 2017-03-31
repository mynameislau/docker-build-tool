const webpack = require('webpack');
const { promisifyCB } = require('../utils/build-utils');
const { src, dist, workDir, buildToolDir } = require('../utils/path-utils');
const webpackConfigCreator = require('./javascript/webpack.config.js');

const getCompiler = () => {
  const conf = {
    entries: ['head-bundle.js'],
    workDir: workDir,
    buildToolDir: buildToolDir,
    src: src,
    dist: dist
  };
  const webpackConfig = webpackConfigCreator(conf);
  const compiler = webpack(webpackConfig);

  return compiler;
};

const formatStats = stats => console.log(stats.toString({
  chunks: false,  // Makes the build much quieter
  colors: true    // Shows colors in the console
}));

const bundleJS = () => {
  const compiler = getCompiler();

  return async () => {
    await promisifyCB(compiler.run.bind(compiler))
      .catch(error => { throw error; })
      .then(formatStats);
  };
};

const bundleAndWatch = cb => {
  const compiler = getCompiler();

  compiler.watch({}, (err, stats) => {
    if (err) {
      throw err;
    }
    else {
      formatStats(stats);
    }
  });
  cb();
};


module.exports = {
  dev: bundleAndWatch,
  dist: bundleJS(),
  name: 'css'
};
