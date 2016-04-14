import _debug from 'debug'
import passport from 'koa-passport'
// import { Strategy as BearerStrategy } from 'passport-http-bearer'
import only from 'only'
import User from '../models/user'

export default (app, router) => {
  const debug = _debug('koa:routes:user')

  const authCheck = async (ctx, next) => {
    // bearer NOT save session,
    // so can NOT use isAuthenticated()
    // if (ctx.isAuthenticated()) {
      // return next()
    // }
    // ctx.body = { message: 'Unauthorized' }
    // ctx.status = 401
    await passport.authenticate('bearer', {
      session: false
    }, async (user, info, status) => {
      if (user === false) {
        debug(info)
        ctx.status = 401
      } else {
        await next()
      }
    })(ctx, next)
  }

  const whiteProps = 'username token expires'

  router.get('/users', authCheck, async ctx => {
    // .find({}) returns all data about all users
    const users = await User.find({}).exec()
    ctx.body = users
  })

  router.get('/users/:id', authCheck, async ctx => {
    // .findById(id) returns all data about one user, if one exists with that _id
    const user = await User.findById(ctx.params.id).exec()
    ctx.body = user
  })

  // todo: move to auth
  router.post('/users'/*, authCheck*/, async ctx => {
    const {
      username,
      password
    } = ctx.request.body
    const user = await User.create({ username, password })
    ctx.body = only(user.toJSON(), whiteProps)
  })
}
