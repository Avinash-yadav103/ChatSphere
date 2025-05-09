const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    url: require.resolve('url/'),
    assert: require.resolve('assert/'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    zlib: require.resolve('browserify-zlib'),
    buffer: require.resolve('buffer/'),
    process: require.resolve('process/browser'),
  };
  
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};