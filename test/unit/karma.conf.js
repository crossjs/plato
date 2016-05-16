import config from '../../.tools/config'
import webpackConfig from '../../.tools/webpack'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: `./${config.dir_test}/unit/index.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  proxies: {
    // '/apis/': 'http://localhost:3000/apis/'
  },
  singleRun: config.coverage_enabled,
  frameworks: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/unit/index.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: config.coverage_reporters,
    check: config.coverage_check
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: webpackConfig.devtool,
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      preLoaders: [{
        test: /\.js$/,
        include: config.paths.src(),
        loader: 'isparta'
      }],
      loaders: webpackConfig.module.loaders
    },
    vue: {
      loaders: {
        js: 'isparta'
      }
    }
  },
  webpackMiddleware: {
    noInfo: true
  }
}

export default cfg => cfg.set(karmaConfig)
