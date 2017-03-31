const browserSync = require('browser-sync');
const buildToolConfig = require('../utils/config-utils');

const startBrowserSyncWatch = cb => {
  const bsInst = browserSync.create();

  console.log(buildToolConfig.browserSyncConfig.serveStatic);
  bsInst.init(buildToolConfig.browserSyncConfig, cb);
};

module.exports = {
  dev: startBrowserSyncWatch,
  dist: cb => cb(),
  name: 'css'
};
