import Koa from 'koa'
import mongoose from 'mongoose'
import convert from 'koa-convert'
// // import historyApiFallback from 'koa-connect-history-api-fallback'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
// // import csrf from 'koa-csrf'
import favicon from 'koa-favicon'
import serve from 'koa-static'
import error from 'koa-error'
import mongoError from 'koa-mongo-error'
import bodyParser from 'koa-bodyparser'
// import json from 'koa-json'
import session from 'koa-generic-session'
import MongoStore from 'koa-generic-session-mongo'
import _debug from 'debug'
import config from '../config'
import routes from './routes'
import webpack from './tools/webpack'

const debug = _debug('koa:server')
const paths = config.utils_paths

const {
  NODE_ENV = 'production',
  MONGODB_URI = 'localhost:27017',
  SECRET_PASS_1 = '39u29fojfojf',
  SECRET_PASS_2 = 'feifif902i39f'
} = process.env

const {
  server_host,
  server_port
} = config

mongoose.set('debug', NODE_ENV === 'development')
// this is the initial connection by Mongoose to MongoDB
mongoose.connect(MONGODB_URI)
mongoose.connection.on('error', debug)
// mongoose.connection.db.dropDatabase((err, result) => {
//   console.log(err, result)
// })
// mongoose.connection.db.dropCollection('users', (err, result) => {
//   console.log(err, result)
// })
// mongoose.connection.collections.users.drop((err, result) => {
//   console.log(err, result)
// })
// mongoose.connection.collections.users.reIndex((err, result) => {
//   console.log(err, result)
// })

// Koa application is now a class and requires the new operator.
const app = new Koa()

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
// app.use(convert(historyApiFallback({
  // verbose: false
// })))

// bodyParser && json
app.use(bodyParser())
// app.use(json())

// etag works together with conditional-get
app.use(conditional())
app.use(etag())

// error
app.use(error())
app.use(mongoError())

app.keys = [SECRET_PASS_1, SECRET_PASS_2]
app.use(convert(session({
  store: new MongoStore()
})))

routes(app)

// ------------------------------------
// Apply Webpack DEV/HMR Middleware
// ------------------------------------
if (NODE_ENV === 'development') {
  webpack(app)
} else {
  // favicon
  app.use(favicon(paths.dist('static/favicon.ico')))

  // static with cache
  app.use(serve(paths.dist(), {
    maxAge: 365 * 24 * 60 * 60
  }))
}

app.listen(server_port, server_host, err => {
  if (err) {
    debug(err)
    return
  }
  debug('Server is now running at ' + server_host + ':' + server_port + '.')
})
