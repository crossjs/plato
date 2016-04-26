import _debug from 'debug'
import respond from './utils/respond'
import hash from '../utils/hash'
import User from '../models/user'
import { check } from '../passport'

export default (app, router) => {
  const debug = _debug('koa:routes:user')

  debug('initialize')

  const whiteProps = 'username created'

  router.get('/users', check, async ctx => {
    const users = await User.find({}).exec()
    ctx.body = users
  })

  router.get('/users/:id', check, async ctx => {
    const user = await User.findById(ctx.params.id).select(whiteProps).exec()
    ctx.body = user
  })

  router.del('/users/:id', check, async ctx => {
    const user = await User.findByIdAndRemove(ctx.params.id).exec()
    ctx.body = user
  })

  // profile

  router.get('/user/profile', check, async ctx => {
    const user = await User.findOne({
      token: ctx.request.token
    }).exec()
    ctx.body = user
  })

  router.patch('/user/profile', check, async ctx => {
    const { password0, password } = ctx.request.body
    if (hash(password0, ctx._user.salt) !== ctx._user.password) {
      return respond(400, {
        message: 'Password is NOT correct'
      }, ctx)
    }
    const user = await User.findOneAndUpdate({
      token: ctx.request.token
    }, { password }).exec()
    if (!user) {
      debug(user)
      return respond(404, {
        message: 'User is Not Found'
      }, ctx)
    }
    debug(user)
    ctx.body = user
  })
}
