import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import fs from 'fs'
import _debug from 'debug'
import config, { paths, pkg } from '../config'
const { __DEV__, __PROD__, __TEST__ } = config.globals

const debug = _debug('koa:webpack:config')

debug('Create configuration.')
const webpackConfig = {
  __DEV__,
  __PROD__,
  __TEST__,
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    modules: [paths.src(), 'node_modules'],
    // (was split into `root`, `modulesDirectories` and `fallback` in the old options)
    // In which folders the resolver look for modules
    // relative paths are looked up in every parent folder (like node_modules)
    // absolute paths are looked up directly
    // the order is respected

    descriptionFiles: ['package.json'],
    // These JSON files are read in directories

    mainFields: ['main'],
    // These fields in the description files are looked up when trying to resolve the package directory

    mainFiles: ['index'],
    // These files are tried when trying to resolve a directory

    // aliasFields: ['browser'],
    // These fields in the description files offer aliasing in this package
    // The content of these fields is an object where requests to a key are mapped to the corresponding value

    extensions: ['.css', '.js', '.json', '.vue'],
    // These extensions are tried when resolving a file

    enforceExtension: false,
    // If false it will also try to use no extension from above

    moduleExtensions: ['-loader'],
    // These extensions are tried when resolving a module

    enforceModuleExtension: false,
    // If false it's also try to use no module extension from above

    alias: {
      'plato-components': paths.src('components'),
      // comment out for customizing styles
      'plato-styles': paths.src('themes/default/components'),
      styles: paths.src('themes/default')
    }
    // These aliasing is used when trying to resolve a module
  },
  module: {},
  node: {
    fs: 'empty'
  },
  quiet: true
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = ['babel-polyfill', paths.src('index.js')]

webpackConfig.entry = {
  app: __PROD__
    ? APP_ENTRY_PATH
    : APP_ENTRY_PATH.concat('webpack-hot-middleware/client'),
  vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
  path: paths.dist(),
  publicPath: config.compiler_public_path,
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: `[id].[${config.compiler_hash_type}].js`
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------

webpackConfig.module.preLoaders = [
  {
    test: /\.(js|vue)$/,
    loader: 'eslint',
    exclude: /node_modules/,
    query: {
      emitWarning: __DEV__
    }
  }
]

// ------------------------------------
// Loaders
// ------------------------------------

const cssLoaders = (loaders => {
  if (!__PROD__) {
    return loaders.join('!')
  }
  const [first, ...rest] = loaders
  return ExtractTextPlugin.extract(first, rest.join('!'))
})(['vue-style-loader', 'css-loader?sourceMap'])

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
    test: /\.js$/,
    loader: 'babel',
    include: /plato\-components/
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
    test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000,
      name: '[name].[ext]?[hash:7]'
    }
  }
]

webpackConfig.babel = JSON.parse(fs.readFileSync('.babelrc')).env[config.env] || {}

webpackConfig.vue = {
  loaders: {
    css: cssLoaders,
    js: 'babel'
  },
  postcss: pack => {
    return [
      require('postcss-import')({
        path: paths.src('themes/default'),
        // use webpack context
        addDependencyTo: pack
      }),
      require('postcss-url')(),
      require('postcss-cssnext')({
        // see: https://github.com/ai/browserslist#queries
        browsers: 'Android >= 4, iOS >= 7',
        features: {
          customProperties: {
            variables: require(paths.src('themes/default/variables'))
          }
        }
      }),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')()
    ]
  },
  autoprefixer: false
}

webpackConfig.eslint = {
  formatter: require('eslint-friendly-formatter')
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
    template: paths.src('index.ejs'),
    title: `${pkg.name} - ${pkg.description}`,
    favicon: paths.src('static/favicon.png'),
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
    // ignore: ['*.ico', '*.md']
  })
]

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
} else {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

export default webpackConfig
