// import _debug from 'debug'
import User from '../models/user'
import { authCheck } from '../tools/passport'

export default (app, router) => {
  // const debug = _debug('koa:routes:user')

  const whiteProps = 'username created'

  router.get('/users', authCheck, async ctx => {
    const users = await User.find({}).select(whiteProps).exec()
    ctx.body = users
  })

  router.get('/users/:id', authCheck, async ctx => {
    const user = await User.findById(ctx.params.id).select(whiteProps).exec()
    ctx.body = user
  })

  // profile

  router.get('/profile', authCheck, async ctx => {
    const user = await User.findOne({
      token: ctx.request.token
    }).exec()
    ctx.body = user
  })

  router.patch('/profile', async ctx => {
    const { password } = ctx.request.body
    const user = await User.findOneAndUpdate({
      token: ctx.request.token
    }, { password }).exec()
    ctx.body = user
  })
}
