import webpack from 'webpack'
import webpackConfig from '../../webpack'
import devMiddleware from './middleware/webpack-dev'
import hotMiddleware from './middleware/webpack-hot'
import mocking from './middleware/mocking'
import { paths, server_mock } from '../../config'
import _debug from 'debug'

const debug = _debug('plato:koa:server')

export default app => {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev middleware.')
  app.use(devMiddleware(compiler))

  debug('Enable Webpack Hot Module Replacement (HMR).')
  app.use(hotMiddleware(compiler))

  if (server_mock) {
    debug('Enable mocking middleware.')
    app.use(mocking({
      root: paths.base(),
      matcher: /^\/apis\//,
      reducer: null
    }))
  }
}
