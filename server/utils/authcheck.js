import _debug from 'debug'
import passport from 'koa-passport'
import { expires } from './bearer'

const debug = _debug('koa:authCheck')

export default async (ctx, next) => {
  await passport.authenticate('bearer', {
    session: false
  }, async (user, info, status) => {
    if (user === false) {
      debug(info)
      ctx.status = 401
    } else {
      // update expires
      await user.update({
        expires: Date.now() + expires
      }).exec()
      await next()
    }
  })(ctx, next)
}
