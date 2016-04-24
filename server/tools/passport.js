import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import _debug from 'debug'
import User from '../models/user'
import hash from '../utils/hash'
import { BEARER_EXPIRES } from '../config'

const debug = _debug('koa:tools:passport')

export const authCheck = async (ctx, next) => {
  await passport.authenticate('bearer', {
    session: false
  }, async (user, info, status) => {
    if (user === false) {
      debug(info)
      ctx.status = 401
    } else {
      const expires = Date.now() + BEARER_EXPIRES
      // update expires
      await user.update({ expires }).exec()
      // todo: apply user to ctx?
      ctx._user = { ...user.toJSON(), expires }
      await next()
    }
  })(ctx, next)
}

export default app => {
  app.use(passport.initialize())

  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }).exec((err, user) => {
      if (err) {
        return done(null, false, { message: 'An error occurred.' })
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      debug(user)
      if (hash(password, user.salt) !== user.password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user, { message: 'Logged in.' })
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
}
