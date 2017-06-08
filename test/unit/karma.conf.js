import config from '../../config'
import webpackConfig from '../../webpack.config.babel.js'

const debug = require('debug')('PLATO:karma')
debug('Create configuration.')

const alias = { ...webpackConfig.resolve.alias, vue: 'vue/dist/vue' }

const karmaConfig = {
  basePath: '../../', // project root in relation to bin/karma.js
  files: [
    `./${config.dir_src}/polyfills/index.js`,
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: `./${config.dir_test}/unit/index.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  proxies: {
    // '/api/': 'http://0.0.0.0:3000/api/'
  },
  singleRun: config.coverage_enabled,
  frameworks: ['mocha', 'es6-shim'],
  preprocessors: {
    [`${config.dir_src}/polyfills/index.js`]: ['webpack'],
    [`${config.dir_test}/unit/index.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: config.coverage_reporters
  },
  browsers: ['Chrome'],
  webpack: {
    devtool: webpackConfig.devtool,
    resolve: { ...webpackConfig.resolve, alias },
    plugins: webpackConfig.plugins,
    module: {
      rules: webpackConfig.module.rules
    },
    node: webpackConfig.node,
    performance: {
      hints: false
    }
  },
  webpackMiddleware: {
    noInfo: true
  }
}

export default cfg => cfg.set(karmaConfig)
