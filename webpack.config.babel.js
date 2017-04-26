import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import config, { paths } from './config'

const pkg = require('./package.json')

const { __DEV__, __PROD__, __TEST__ } = config.globals
const debug = require('debug')('PLATO:webpack')

debug('Create configuration.')

const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.css', '.js', '.json', '.vue'],
    alias: {}
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: config.compiler_devtool,
  devServer: {
    host: config.server_host,
    port: config.server_port,
    // proxy is useful for debugging
    proxy: [{
      context: '/api',
      target: 'http://localhost:3001',
      pathRewrite: {
        '^/api': '' // Host path & target path conversion
      }
    }],
    compress: true,
    hot: true,
    noInfo: true
  },
  entry: {
    app: [
      // 加载 polyfills
      paths.src('polyfills/index.js'),
      paths.src('index.js')],
    plato: [
      // from platojs
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync',
      // from local deps
      'vuex-localstorage',
      'vuex-actions'
    ]
  },
  output: {
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`
  },
  performance: {
    hints: __PROD__ ? 'warning' : false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: __DEV__,
          formatter: require('eslint-friendly-formatter')
        },
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: pack => {
            // see: https://github.com/ai/browserslist#queries
            const browsers = 'Android >= 4, iOS >= 7'

            return [
              require('postcss-import')({
                path: paths.src('application/styles')
              }),
              require('postcss-url')({
                basePath: paths.src('static')
              }),
              require('postcss-cssnext')({
                browsers,
                features: {
                  customProperties: {
                    variables: require(paths.src('application/styles/variables'))
                  },
                  // 禁用 autoprefixer，在 postcss-rtl 后单独引入
                  // 否则会跟 postcss-rtl 冲突
                  autoprefixer: false
                }
              }),
              // 如果不需要 flexible，请移除
              require('postcss-flexible')({
                remUnit: 75
              }),
              // PostCSS plugin for RTL-optimizations
              require('postcss-rtl')({
                // Custom function for adding prefix to selector. Optional.
                addPrefixToSelector (selector, prefix) {
                  if (/^html/.test(selector)) {
                    return selector.replace(/^html/, `html${prefix}`)
                  }
                  if (/:root/.test(selector)) {
                    return selector.replace(/:root/, `${prefix}:root`)
                  }
                  // compliant with postcss-flexible
                  if (/^\[data-dpr(="[1-3]")?]/.test(selector)) {
                    return `${prefix}${selector}`
                  }
                  return `${prefix} ${selector}`
                }
              }),
              require('autoprefixer')({
                browsers
              }),
              require('postcss-browser-reporter')(),
              require('postcss-reporter')()
            ]
          },
          autoprefixer: false,
          loaders: {
            js: 'babel-loader'
          },
          // 必须为 true，否则 vue-loader@12.0.0 会导致 css 加载顺序混乱
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        // platojs 模块需要 babel 处理
        exclude: /node_modules[/\\](?!platojs)/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /@[1-3]x\S*\.(png|jpg|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        exclude: /@[1-3]x/, // skip encoding @1x/@2x/@3x images with base64
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.src('index.ejs'),
      title: `${pkg.name} - ${pkg.description}`,
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
      ignore: ['README.md']
    }),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css')
  ]
}

// ------------------------------------
// Plugins
// ------------------------------------

if (__PROD__) {
  debug('Enable plugins for production (Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: true
    })
  )
} else {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
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
      names: ['plato']
    })
  )
}

export default webpackConfig
