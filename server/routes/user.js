import _debug from 'debug'
import User from '../models/user'
import authCheck from '../utils/authcheck'

export default (app, router) => {
  const debug = _debug('koa:routes:user')

  const whiteProps = 'username created'

  router.get('/users', authCheck, async ctx => {
    // .find({}) returns all data about all users
    const users = await User.find({}).select(whiteProps).exec()
    ctx.body = users
  })

  router.get('/users/:id', authCheck, async ctx => {
    // .findById(id) returns all data about one user, if one exists with that _id
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
}
