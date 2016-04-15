import { STATUS_CODES } from 'http'

export default () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.app.emit('error', err, ctx);

      let message

      // mongoose duplicate key error
      if (err.code === 11000 || err.code === 11001) {
        ctx.status = 409
        message = err.errmsg
      }
      // mongoose type and validation error
      else if (err.name === 'CastError' || err.name === 'ValidationError') {
        ctx.status = 400
      }
      // others
      else {
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
