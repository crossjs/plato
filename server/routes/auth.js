import _debug from 'debug'
// import passport from 'passport'
import only from 'only'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import User from '../models/user'
import hash from '../utils/hash'
import salt from '../utils/salt'

export default (app, router) => {
  const debug = _debug('koa:routes:auth')

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

  async function refresh (user, ctx) {
    const _d = {
      token: salt(),
      expires: Date.now() + expires
    }
    // refresh token
    await user.update(_d).exec()
    // await ctx.logIn(user, { session: false })
    ctx.body = { ...only(user.toJSON(), whiteProps), ..._d }
    ctx.status = 201
  }

  router.post('/login', (ctx, next) => {
    return passport.authenticate('local', {
      failWithError: true
    }, async (user, info, status) => {
      if (user === false) {
        debug(info)
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
        debug(info)
        ctx.status = 401
      } else {
        await refresh(user, ctx)
      }
    })(ctx, next)
  })

  router.del('/logout', async (ctx, next) => {
    let token

    if (ctx.headers && ctx.headers.authorization) {
      var parts = ctx.headers.authorization.split(' ')
      if (parts.length === 2) {
        const scheme = parts[0]
        const credentials = parts[1]

        if (/^Bearer$/i.test(scheme)) {
          token = credentials
        }
      } else {
        ctx.throw(400)
        return
      }
    }

    if (ctx.body && ctx.body.access_token) {
      if (token) {
        ctx.throw(400)
        return
      }
      token = ctx.body.access_token
    }

    if (ctx.query && ctx.query.access_token) {
      if (token) {
        ctx.throw(400)
        return
      }
      token = ctx.query.access_token
    }

    if (!token) {
      ctx.throw(400)
      return
    }

    const user = await User.findOne({ token }).exec((err, user) => {
      if (err) {
        ctx.throw(err)
        return
      }
      if (!user) {
        ctx.throw(404)
        return
      }

      return user
    })

    await user.update({
      token: '',
      expires: 0
    }).exec()

    ctx.body = { message: 'OK' }
    ctx.status = 200
  })
}
