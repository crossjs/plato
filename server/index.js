import Koa from 'koa'
import logger from 'koa-logger'
// import convert from 'koa-convert'
// import historyApiFallback from 'koa-connect-history-api-fallback'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
// import csrf from 'koa-csrf'
import favicon from 'koa-favicon'
import serve from 'koa-static'
// import error from 'koa-error'
import bodyParser from 'koa-bodyparser'
import bearerToken from 'koa-bearer-token'
import _debug from 'debug'
import config from './config'
import mongo from './db/mongo'
import routes from './routes'
import webpack from './tools/webpack'
import error from './tools/error'

const debug = _debug('koa:server')
const paths = config.utils_paths

// Koa application is now a class and requires the new operator.
const app = new Koa()
app.use(logger())

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
// app.use(convert(historyApiFallback({
  // verbose: false
// })))

// sessions
// app.keys = [SECRET_PASS_1, SECRET_PASS_2]
// app.use(convert(session({
//   store: new MongoStore()
// })))

// bodyParser && bearerToken
app.use(bodyParser())
app.use(bearerToken())

// etag works together with conditional-get
app.use(conditional())
app.use(etag())

// last
app.use(error())

mongo(app)
routes(app)

// error
// app.use(error())

// ------------------------------------
// Apply Webpack DEV/HMR Middleware
// ------------------------------------
if (app.env === 'development') {
  webpack(app)
} else {
  // favicon
  app.use(favicon(paths.dist('favicon.ico')))

  // static with cache
  app.use(serve(paths.dist(), {
    maxAge: 365 * 24 * 60 * 60
  }))
}

const {
  server_host,
  server_port
} = config

export default app.listen(server_port, server_host, err => {
  if (err) {
    debug(err)
    return
  }
  debug('Server is now running at %s:%s.', server_host, server_port)
})
