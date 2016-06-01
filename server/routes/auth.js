import only from 'only'
import _debug from 'debug'
import passport from '../passport'
import User from '../models/user'
import salt from '../utils/salt'
import respond from '../utils/respond'
import { bearer_expires } from '../config'

export default (app, router) => {
  const debug = _debug('koa:routes:auth')

  debug('initialize')

  // clear
  // User.remove({}).exec()

  const whiteProps = 'username token expires'

  // refresh token
  async function refresh (user, ctx) {
    const token = salt()
    const expires = Date.now() + bearer_expires
    await user.update({ token, expires }).exec()
    ctx.body = { ...only(user.toJSON(), whiteProps), token, expires }
    ctx.status = 201
  }

  function callback (user, info, status) {
    if (user === false) {
      respond(400, info, this)
    } else {
      return refresh(user, this)
    }
  }

  // login
  router.post('/auth/login', (ctx, next) => {
    return passport.authenticate('local', {
      failWithError: true
    }, callback.bind(ctx))(ctx, next)
  })

  // check
  router.get('/auth/check', (ctx, next) => {
    return passport.authenticate('bearer', {
      session: false
    }, callback.bind(ctx))(ctx, next)
  })

  // signup
  router.post('/auth/signup', async ctx => {
    const { username, password } = ctx.request.body
    const user = await User.create({ username, password })
    ctx.body = only(user.toJSON(), whiteProps)
    ctx.status = 201
  })

  // logout
  router.del('/auth/logout', async (ctx, next) => {
    const token = ctx.request.token

    if (!token) {
      return respond(400, {
        message: 'Token not found.'
      }, ctx)
    }

    await User.findOneAndUpdate({ token }, { expires: 0 }, { new: true }).exec()

    ctx.body = {}
    ctx.status = 200
  })
}
