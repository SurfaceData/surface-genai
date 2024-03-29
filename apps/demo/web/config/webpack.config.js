const path = require('path');
/** @returns {import('webpack').Configuration} Webpack Configuration */
const { getPaths } = require('@redwoodjs/internal');

const redwoodPaths = getPaths();
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    config.resolve.alias.react = path.resolve(
      redwoodPaths.base,
      '../../node_modules/react'
    );
    config.resolve.alias['react-hook-form'] = path.resolve(
      redwoodPaths.base,
      '../../node_modules/react-hook-form'
    );
  }
  return config;
};
