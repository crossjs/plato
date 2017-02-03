import { resolve } from 'path'
import _debug from 'debug'

const NODE_ENV = process.env.NODE_ENV || 'development'

const debug = _debug('PLATO:config:base')
const pkg = require('../package.json')

const config = {
  env: NODE_ENV,

  name: pkg.name,
  version: pkg.version,
  description: pkg.description,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: resolve(__dirname, '../'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0', // binds to all hosts
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_html_minify: false,
  compiler_public_path: '',
  compiler_vendor: [
    'vue',
    'vue-router',
    'vuex',
    'vuex-actions',
    'vuex-localstorage',
    'vuex-persistedstate',
    'vuex-router-sync'
  ],

  // ------------------------------------
  // Environment
  // ------------------------------------
  globals: {
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    __DEV__: NODE_ENV === 'development',
    __PROD__: NODE_ENV === 'production',
    __TEST__: NODE_ENV === 'test'
  }
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (pkg.dependencies.hasOwnProperty(dep)) {
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
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist),
    test: base.bind(null, config.dir_test)
  }
})()

export default config
