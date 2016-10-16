import webpack from 'webpack'
import ora from 'ora'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import fs from 'fs'
import _debug from 'debug'
import config, { paths } from '../config'
const { __DEV__, __PROD__, __TEST__ } = config.globals

const debug = _debug('plato:webpack:config')

debug('Create configuration.')

const webpackConfig = {
  __DEV__,
  __PROD__,
  __TEST__,
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.src(),
    extensions: ['', '.css', '.js', '.json', '.vue'],
    alias: {
      styles: paths.src(`themes/${config.theme}`)
    },
    modulesDirectories: ['node_modules']
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

const APP_ENTRY_PATH = [
  // override native Promise
  'nuo',
  // to reduce built file size,
  // we load the specific polyfills with core-js
  // instead of the all-in-one babel-polyfill.
  'core-js/fn/array/find',
  'core-js/fn/array/find-index',
  'core-js/fn/object/assign',
  paths.src('index.js')]

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
    test: /@[1-3]x\S*\.(png|jpg|gif)(\?.*)?$/,
    loader: 'file',
    query: {
      name: '[name].[ext]?[hash:7]'
    }
  },
  {
    test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
    loader: 'url',
    // do NOT base64encode @1x/@2x/@3x images
    exclude: /@[1-3]x/,
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
        path: paths.src(`themes/${config.theme}`),
        // use webpack context
        addDependencyTo: pack
      }),
      require('postcss-url')({
        basePath: paths.src('static')
      }),
      require('postcss-cssnext')({
        // see: https://github.com/ai/browserslist#queries
        browsers: 'Android >= 4, iOS >= 7',
        features: {
          customProperties: {
            variables: require(paths.src(`themes/${config.theme}/variables`))
          }
        }
      }),
      require('postcss-flexible')({
        remUnit: 75
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
    title: `${config.pkg.name} - ${config.pkg.description}`,
    // favicon: paths.src('static/favicon.png'),
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
  let spinner
  webpackConfig.plugins.push(
    new webpack.ProgressPlugin((percentage, message) => {
      if (config.server_ready) {
        if (!spinner) {
          spinner = ora().start()
        }
      }
      if (spinner) {
        spinner.text = message
        if (percentage === 1) {
          spinner.stop()
        }
      }
    }),
    new FaviconsWebpackPlugin({
      logo: paths.src('assets/logo.svg'),
      prefix: 'icons-[hash:7]/',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

export default webpackConfig
