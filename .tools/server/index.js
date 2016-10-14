import Koa from 'koa'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import serve from 'koa-static'
import _debug from 'debug'
import webpack from 'webpack'
import error from './middlewares/error'
import devMiddleware from './middlewares/webpack-dev'
import hotMiddleware from './middlewares/webpack-hot'
import mocking from './middlewares/mocking'
import config, { paths, server_mock } from '../config'
import webpackConfig from '../webpack'

const debug = _debug('plato:koa:server')

// Koa application is now a class and requires the new operator.
const app = new Koa()

// log
app.use(logger())

// last
app.use(error())

// ------------------------------------
// Apply Webpack DEV/HMR Middleware
// ------------------------------------
if (app.env === 'production') {
  // favicon
  app.use(favicon(paths.dist('favicon.png')))

  // static with cache
  app.use(serve(paths.dist(), {
    maxAge: 365 * 24 * 60 * 60
  }))
} else {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev middleware.')
  app.use(devMiddleware(compiler, config))

  debug('Enable Webpack Hot Module Replacement (HMR).')
  app.use(hotMiddleware(compiler, config))

  if (server_mock) {
    debug('Enable mocking middleware.')
    app.use(mocking(server_mock))
  }
}

const {
  server_host,
  server_port
} = config

const args = [server_port]

if (server_host) {
  args.push(server_host)
}

args.push(err => {
  if (err) {
    debug(err)
    return
  }
  debug('Server is now running at %s:%s.', server_host, server_port)
  config.server_ready = true
})

export default app.listen(...args)
