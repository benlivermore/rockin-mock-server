const env = process.env.APP_ENV || 'production';

let externals = {};

if (env === 'development') {
  externals = {};
}

if (env === 'test') {
  externals = {
    cheerio: 'window'
  };
}

module.exports = externals;
