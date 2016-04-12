import webpack from 'webpack'
// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import devMiddleware from './middleware/webpack-dev'
import hotMiddleware from './middleware/webpack-hot'
import webpackConfig from '../../webpack'
// import config from '../../config'

// ------------------------------------
// Apply Webpack DEV/HMR Middleware
// ------------------------------------
export default app => {
  const compiler = webpack(webpackConfig)

  app.use(devMiddleware(compiler))
  app.use(hotMiddleware(compiler))

  // app.use(devMiddleware(compiler, {
  //   publicPath: config.compiler_public_path,
  //   hot: true,
  //   lazy: false,
  //   noInfo: config.compiler_quiet,
  //   quiet: config.compiler_quiet,
  //   stats: config.compiler_stats
  // }))

  // app.use(hotMiddleware(compiler, {
    // log: debug,
    // path: `${config.compiler_public_path}__webpack_hmr`,
    // heartbeat: 10 * 1000
  // }))
}
