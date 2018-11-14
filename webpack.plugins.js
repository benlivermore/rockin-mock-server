/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const env = process.env.APP_ENV || 'production';


const webpackCleanupPlugin = new WebpackCleanupPlugin();
const occurenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  compress: {
    warnings: false,
    screw_ie8: true,
    drop_console: false,
    drop_debugger: true
  }
});
const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();

let plugins = [];

if (env === 'production') {
  plugins = [
    uglifyJsPlugin,
    occurenceOrderPlugin
  ];
} else {
  plugins = [
    noEmitOnErrorsPlugin
  ];
}

module.exports = plugins;
