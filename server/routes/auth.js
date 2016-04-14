// import _debug from 'debug'
// import passport from 'passport'
import only from 'only'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import User from '../models/user'
import hash from '../utils/hash'
import salt from '../utils/salt'

export default (app, router) => {
  // const debug = _debug('koa:routes:auth')

  app.use(passport.initialize())
  // app.use(passport.session())

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

  passport.use(new BearerStrategy((token, done) => {
    User.findOne({ token, expires: { $gte: Date.now() } }).exec((err, user) => {
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

  const expires = 60 * 60 * 1000
  const whiteProps = 'username token expires'

  function data () {
    return {
      token: salt(),
      expires: Date.now() + expires
    }
  }

  async function refresh (user, ctx) {
    const _d = data()
    // refresh token
    await user.update(_d).exec()
    await ctx.logIn(user, { session: false })
    ctx.body = { ...only(user.toJSON(), whiteProps), ..._d }
    ctx.status = 201
  }

  router.post('/login', (ctx, next) => {
    return passport.authenticate('local', {
      failWithError: true
    }, async (user, info, status) => {
      if (user === false) {
        ctx.body = info
        ctx.status = 401
      } else {
        await refresh(user, ctx)
      }
    })(ctx, next)
  })

  router.get('/check', (ctx, next) => {
    return passport.authenticate('bearer', {
      session: false
    }, async (user, info, status) => {
      if (user === false) {
        ctx.body = info
        ctx.status = 401
      } else {
        await refresh(user, ctx)
      }
    })(ctx, next)
  })
}
