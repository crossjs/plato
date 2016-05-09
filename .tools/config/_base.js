/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import { argv } from 'yargs'
import _debug from 'debug'

const debug = _debug('koa:config:base')

const config = {
  env : process.env.NODE_ENV || 'development',

  pkg : require('../../package.json'),

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../../'),
  dir_src    : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  server_port : process.env.PORT || 3000,
  server_mock : !!argv.mock,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_html_minify     : false,
  compiler_css_modules     : false,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_quiet           : false,
  compiler_public_path     : '',
  compiler_vendor : [],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled   : !argv.watch,
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
  ]
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (config.pkg.dependencies.hasOwnProperty(dep)) {
      return true
    }

    debug(
      'Package "' + dep + '" was not found as an npm dependency in package.json; ' +
      'it won\'t be included in the webpack vendor bundle.\n' +
      'Consider removing it from compiler_vendor in "./config/_base.js"'
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src : base.bind(null, config.dir_src),
    dist : base.bind(null, config.dir_dist),
    server : base.bind(null, config.dir_server),
    test : base.bind(null, config.dir_test)
  }
})()

export default config
