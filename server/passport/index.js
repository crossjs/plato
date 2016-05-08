import _debug from 'debug'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { bearer_expires } from '../config'
import hash from '../utils/hash'
import User from '../models/user'

const debug = _debug('koa:passport')

export default passport

export const check = async (ctx, next) => {
  await passport.authenticate('bearer', {
    session: false
  }, async (user, info, status) => {
    if (user === false) {
      debug(info)
      ctx.status = 401
    } else {
      const expires = Date.now() + bearer_expires
      // update expires
      await user.update({ expires }).exec()
      // todo: apply user to ctx?
      ctx._user = { ...user.toJSON(), expires }
      await next()
    }
  })(ctx, next)
}

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }).exec((err, user) => {
    if (err) {
      return done(null, false, { message: '系统错误' })
    }
    if (!user) {
      return done(null, false, { message: '账号不正确' })
    }
    if (!user.state) {
      return done(null, false, { message: '账号已停用' })
    }
    if (hash(password, user.salt) !== user.password) {
      return done(null, false, { message: '密码不正确' })
    }
    return done(null, user, { message: '登录成功' })
  })
}))

passport.use(new BearerStrategy((token, done) => {
  User.findOne({ token, expires: { $gte: Date.now() } }).exec((err, user) => {
    if (err) {
      return done(null, false, { message: 'An error occurred.' })
    }
    if (!user) {
      return done(null, false, { message: 'Token not exist.' })
    }
    debug(user)
    return done(null, user, { message: 'Token validated.' })
  })
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})
