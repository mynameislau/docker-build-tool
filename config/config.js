const path = require('path');

const srcDir = 'src';
const distDir = 'dist';
const workDir = path.resolve('../');

module.exports = () => ({
  srcDir: srcDir,
  distDir: distDir,
  workDir: workDir,

  browserSyncConfig: {
    'ui': {
      'port': 3001,
      'weinre': {
        'port': 8080
      }
    },
    'files': [
      path.resolve(workDir, distDir, 'css/*.css'),
      path.resolve(workDir, distDir, 'js/*.js')
    ],
    'watchEvents': [
      'change'
    ],
    'watchOptions': {
      'ignoreInitial': true
    },
    'server': false,
    'proxy': 'http://localhost:8080',
    // 'port': 3000,
    'middleware': [{
      route: '/pub/static',
      handle: (req, res, next) => {
        console.log('ouiiii');
        const regex = /\/.*\/scala\/css\/(.*\.css)/;

        if (regex.test(req.url)) {
          console.log('oui');
          req.url = req.url.replace(regex, '/pub/static/machin/css/$1');
          console.log(req.url);
        }
        next();
      }
    }],
    'serveStatic': [{
      route: '/pub/static/machin/css',
      dir: [path.resolve(workDir, distDir, 'css')]
    }],
    'ghostMode': {
      'clicks': true,
      'scroll': true,
      'forms': {
        'submit': true,
        'inputs': true,
        'toggles': true
      }
    },
    'logLevel': 'info',
    'logPrefix': 'BS',
    'logConnections': false,
    'logFileChanges': true,
    'logSnippet': true,
    'rewriteRules': [],
    'open': 'local',
    'browser': 'default',
    'cors': false,
    'xip': false,
    'hostnameSuffix': false,
    'reloadOnRestart': false,
    'notify': true,
    'scrollProportionally': true,
    'scrollThrottle': 0,
    'scrollRestoreTechnique': 'window.name',
    'scrollElements': [],
    'scrollElementMapping': [],
    'reloadDelay': 0,
    'reloadDebounce': 0,
    'reloadThrottle': 0,
    'plugins': [],
    'injectChanges': true,
    'startPath': null,
    'minify': true,
    'host': null,
    'localOnly': false,
    'codeSync': true,
    'timestamps': true,
    'clientEvents': [
      'scroll',
      'scroll:element',
      'input:text',
      'input:toggles',
      'form:submit',
      'form:reset',
      'click'
    ],
    'socket': {
      'socketIoOptions': {
        'log': false
      },
      'socketIoClientConfig': {
        'reconnectionAttempts': 50
      },
      'path': '/browser-sync/socket.io',
      'clientPath': '/browser-sync',
      'namespace': '/browser-sync',
      'clients': {
        'heartbeatTimeout': 5000
      }
    },
    'tagNames': {
      'less': 'link',
      'scss': 'link',
      'css': 'link',
      'jpg': 'img',
      'jpeg': 'img',
      'png': 'img',
      'svg': 'img',
      'gif': 'img',
      'js': 'script'
    }
  }
});
