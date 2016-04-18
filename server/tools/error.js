import { STATUS_CODES } from 'http'
// import _debug from 'debug'

export default () => {
  // const debug = _debug('koa:tools:error')
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.app.emit('error', err, ctx)

      let message

      // mongoose duplicate key error
      if (err.code === 11000 || err.code === 11001) {
        ctx.status = 409
        message = err.errmsg
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        // mongoose type and validation error
        ctx.status = 400
      } else {
        // others
        ctx.status = ctx.status || 500
        message = err.message
      }

      ctx.type = 'application/json'
      ctx.body = {
        code: STATUS_CODES[ctx.status],
        message
      }
    }
  }
}
