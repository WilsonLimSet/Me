const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    "path": require.resolve("path-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve('stream-browserify'),
    "buffer": require.resolve('buffer/'),
  };
  return config;
};
