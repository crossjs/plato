// import _debug from 'debug'
// import passport from 'passport'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import User from '../models/user'
import hash from '../utils/hash'
import salt from '../utils/salt'

export default (app, router) => {
  // const debug = _debug('koa:routes:auth')

  app.use(passport.initialize())
  app.use(passport.session())

  router.post('/login', (ctx, next) => {
    return passport.authenticate('local', {
      failWithError: true
    }, async (user, info, status) => {
      ctx.body = info
      if (user === false) {
        ctx.status = 401
      } else {
        const token = {token: salt()}
        await user.update(token)
        ctx.body = token
      }
    })(ctx, next)
  })

  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }).exec((err, user) => {
      if (err) {
        return done(null, false, { message: 'An error occurred.' })
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (hash(password, user.salt) !== user.password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user, { message: 'Logged in.' })
    })
  }))

  router.get('/check', (ctx, next) => {
    return passport.authenticate('bearer', {
      session: false
    }, (user, info, status) => {
      ctx.body = info
      if (user === false) {
        ctx.status = 401
      } else {
        ctx.status = 200
        return ctx.login(user)
      }
    })(ctx, next)
  })

  passport.use(new BearerStrategy((token, done) => {
    // todo: refresh token?
    User.findOne(token).exec((err, user) => {
      if (err) {
        return done(null, false, { message: 'An error occurred.' })
      }
      if (!user) {
        return done(null, false, { message: 'Token not exist.' })
      }
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
