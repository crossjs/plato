import _debug from 'debug'
import respond from './utils/respond'
import hash from '../utils/hash'
import User from '../models/user'
import { check } from '../passport'

export default (app, router) => {
  const debug = _debug('koa:routes:user')

  debug('initialize')

  router.get('/users', check, async ctx => {
    const { $count = '', $offset = 0, $limit = 20 } = ctx.request.query
    const users = await User.find({}).skip(+$offset).limit(+$limit).select('username created state').exec()
    const res = {
      items: users
    }
    if ($count) {
      res.count = await User.find({}).count().exec()
    }
    ctx.body = res
  })

  router.get('/users/:id', check, async ctx => {
    const user = await User.findById(ctx.params.id).exec()
    ctx.body = user
  })

  router.del('/users/:id', check, async ctx => {
    const user = await User.findByIdAndRemove(ctx.params.id).exec()
    ctx.body = user
  })

  router.patch('/users/:id', check, async ctx => {
    const { username, state } = ctx.request.body
    const user = await User.findByIdAndUpdate(ctx.params.id, { username, state }, { new: true }).exec()
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
        message: '密码不正确'
      }, ctx)
    }
    const user = await User.findOneAndUpdate({
      token: ctx.request.token
    }, { password }, { new: true }).exec()
    if (!user) {
      return respond(404, {
        message: '用户不存在'
      }, ctx)
    }
    ctx.body = user
  })
}
