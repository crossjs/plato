import _debug from 'debug'
import passport from 'koa-passport'
import User from '../models/user'
import { expires } from '../utils/bearer'

export default (app, router) => {
  const debug = _debug('koa:routes:user')

  const authCheck = async (ctx, next) => {
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
    // .findById(id) returns all data about one user, if one exists with that _id
    const user = await User.findOne({
      token: this.request.token
    }).exec()
    ctx.body = user
  })
}
