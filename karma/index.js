import { argv } from 'yargs'
import config from '../config'
import webpackConfig from '../webpack'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['mocha'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      loaders: webpackConfig.module.loaders
    }
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.js$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/
  }]
}

export default cfg => cfg.set(karmaConfig)
