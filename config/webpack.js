function withResolveModules(config) {
  config.resolve.modules = [
    'config',
    'utils',
    'app-pages',
    'pages',
    'components',
    'node_modules'
  ];
  return config;
}

function withAntdLessStyle(config, { isServer }) {
  if (isServer) {
    const antStyles = /antd\/.*?\/style.*?/;
    const origExternals = [...config.externals];
    config.externals = [
      (context, request, callback) => {
        if (request.match(antStyles)) return callback();
        if (typeof origExternals[0] === 'function') {
          origExternals[0](context, request, callback);
        } else {
          callback();
        }
      },
      ...(typeof origExternals[0] === 'function' ? [] : origExternals)
    ];

    config.module.rules.unshift({
      test: antStyles,
      use: 'null-loader'
    });
  }
  return config;
}

function webpackConfig(config, options) {
  // Perform customizations to webpack config
  // then return the modified config
  return withResolveModules(withAntdLessStyle(config, options));
}

module.exports = webpackConfig;
