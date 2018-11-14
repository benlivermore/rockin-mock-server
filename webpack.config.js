const path = require('path');
const plugins = require('./webpack.plugins');
const loaders = require('./webpack.loaders');
const externals = require('./webpack.externals');
const aliases = require('./webpack.aliases');

const env = process.env.APP_ENV || 'production';

let filename = 'mockServer.js';
let devtool = 'eval-source-map';
const entry = './src/mockServer.js';

if (env === 'production') {
  filename = 'mockServer.js';
  devtool = 'source-map';
}

const serverConfig = {
  entry,
  devtool,
  externals,
  target: 'node',
  output: {
    path: path.resolve('dist'),
    libraryTarget: 'commonjs-module',
    filename
  },
  resolve: {
    extensions: ['.js'],
    alias: aliases
  },
  module: {
    loaders
  },
  plugins
};

const scenarioAppConfig = {
  entry: './scenariosApp/index.jsx',
  devtool,
  externals,
  target: 'web',
  output: {
    path: path.resolve('dist'),
    filename: 'scenariosApp.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases
  },
  module: {
    loaders
  },
  plugins
};

module.exports = [serverConfig, scenarioAppConfig] ;
