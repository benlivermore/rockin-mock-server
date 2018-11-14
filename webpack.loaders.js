/* eslint import/no-extraneous-dependencies: 0 */

const EXCLUDED_DIRECTORIES_REGEX = /(node_modules|public)/;

const babelLoader = {
  test: /\.jsx?$/,
  exclude: EXCLUDED_DIRECTORIES_REGEX,
  loader: 'babel-loader',
  query: {
    presets: ['es2015', 'stage-2', 'react'],
    plugins: [
      'transform-runtime'
    ]
  }
};

const rawLoader =  {
  test: /\.html$/,
  exclude: EXCLUDED_DIRECTORIES_REGEX,
  loader: 'raw-loader'
}

const loaders = [
  babelLoader,
  rawLoader
];

module.exports = loaders;
