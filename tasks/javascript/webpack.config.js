const webpack = require('webpack');
const path = require('path');
const R = require('ramda');
const { src, dist, workDir, buildToolDir } = require('../../utils/path-utils');

module.exports = ({ entries }) => {
  return {
    entry: R.reduce((acc, entry) => {
      const filepath = path.resolve(workDir, src, 'js', entry);
      const name = path.basename(entry, path.extname(entry));
      return R.assoc(name, filepath, acc);
    }, {}, entries),
    context: buildToolDir,
    devtool: 'source-map',
    output: {
      filename: '[name].js',
      devtoolModuleFilenameTemplate: '[resource]',
      path: path.resolve(workDir, dist, 'js')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        // Specify the common bundle's name.
        names: ['vendor', 'manifest']
      })
    ],
    module: {
      rules: [{
        test: /\.jsx?$/,
        // include: [path.resolve(__dirname, 'app/js')]
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }]
    }
  };
};

// const path = require('path');
//
// module.exports = {
//   entry: './src/js/app',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [{
//         test: /\.jsx?$/,
//         // include: [path.resolve(__dirname, 'app/js')]
//         loader: 'babel-loader',
//         options: {
//           presets: ['es2015', 'react', 'stage-0']
//         }
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader'
//       },
//       {
//         test: /\.json$/,
//         loader: 'json-loader'
//       },
//       {
//         test: /\.dmap$/,
//         loader: 'raw-loader'
//     }],
//   },
//   resolve: {
//     modules: [
//       'node_modules',
//       path.resolve(__dirname, 'src/js')
//     ],
//     extensions: ['.js', '.json', '.jsx', '.css'],
//   },
//   devtool: 'sourcemap',
//   context: __dirname,
//   target: 'web',
//   externals: ['aframe']
// }
