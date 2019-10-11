const withPlugins = require('next-compose-plugins');
const lessPlugin = require('@zeit/next-less');
const bundleAnalyzerPlugin = require('@next/bundle-analyzer');

const webpackConfig = require('./config/webpack.js');
const lessConfig = require('./config/less.js');
const bundleAnalyzerConfig = require('./config/less.js');

const nextPlugins = [
  [lessPlugin, lessConfig],
  [bundleAnalyzerPlugin, bundleAnalyzerConfig]
];

const nextConfig = {
  webpack: webpackConfig
};

module.exports = withPlugins(nextPlugins, nextConfig);
