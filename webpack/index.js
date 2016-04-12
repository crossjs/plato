import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _debug from 'debug'
import config from '../config'

const debug = _debug('koa:webpack:config')
const paths = config.utils_paths
const { __DEV__, __PROD__, __TEST__ } = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.src(),
    extensions: ['', '.css', '.js', '.vue'],
    alias: {},
    modulesDirectories: ['node_modules']
  },
  module: {},
  node: {
    fs: 'empty'
  }
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = paths.src('index.js')

webpackConfig.entry = {
  app: __DEV__
    // ? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`]
    ? [APP_ENTRY_PATH, 'webpack-hot-middleware/client']
    : [APP_ENTRY_PATH],
  vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist(),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------

webpackConfig.module.preLoaders = [
  {
    test: /\.vue$/,
    loader: 'eslint',
    exclude: /node_modules/,
    query: {
      configFile: paths.base('.eslintrc'),
      emitWarning: __DEV__
    }
  }, {
    test: /\.js$/,
    loader: 'eslint',
    exclude: /node_modules/,
    query: {
      configFile: paths.base('.eslintrc'),
      emitWarning: __DEV__
    }
  }
]

// ------------------------------------
// Loaders
// ------------------------------------

webpackConfig.module.loaders = [
  {
    test: /\.vue$/,
    loader: 'vue'
  },
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.html$/,
    loader: 'vue-html'
  },
  {
    test: /\.css$/,
    loaders: ['vue-style', 'css?sourceMap', 'postcss']
  },
  {
    test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: '[name].[ext]?[hash:7]'
    }
  }
]

webpackConfig.vue = {
  loaders: ['vue-style', 'css?sourceMap', 'postcss']
}

webpackConfig.postcss = pack => {
  // use webpack context
  return [
    require('postcss-import')({
      addDependencyTo: pack
    }),
    require('postcss-custom-properties')({
      variables: require('./variables')
    }),
    require('autoprefixer')
  ]
}

webpackConfig.eslint = {
  formatter: require('eslint-friendly-formatter')
}

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  const [first, ...rest] = webpackConfig.vue.loaders
  webpackConfig.vue.loaders = ExtractTextPlugin.extract(first, rest)

  webpackConfig.module.loaders.filter(loader => loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
    const [first, ...rest] = loader.loaders
    loader.loaders = ExtractTextPlugin.extract(first, rest)
  })
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: paths.src('index.html'),
    favicon: paths.src('static/favicon.ico'),
    hash: false,
    inject: true,
    minify: {
      collapseWhitespace: config.compiler_html_minify,
      minifyJS: config.compiler_html_minify
    }
  }),
  new CopyWebpackPlugin([{
    from: paths.src('static')
  }], {
    ignore: ['*.ico', '*.md']
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css')
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

export default webpackConfig
