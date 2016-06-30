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
  frameworks: ['mocha', 'es6-shim'],
  preprocessors: {
    [`${config.dir_test}/unit/index.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: config.coverage_reporters
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: webpackConfig.devtool,
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      loaders: webpackConfig.module.loaders
    },
    vue: webpackConfig.vue,
    // if you are using babel-loader directly then
    // the babel config block becomes required.
    babel: {
      presets: [
        'es2015',
        'stage-0'
      ],
      plugins: [
        'add-module-exports',
        ['__coverage__', { ignore: 'test/' }],
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: false
    }
  },
  webpackMiddleware: {
    noInfo: true
  },
  env: {
    type: 'node',
    params: {
      runner: '--harmony --harmony_arrow_functions'
    }
  }
}

export default cfg => cfg.set(karmaConfig)
