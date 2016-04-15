import { STATUS_CODES } from 'http'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import only from 'only'
import _debug from 'debug'
import User from '../models/user'
import hash from '../utils/hash'
import salt from '../utils/salt'

export default (app, router) => {
  const debug = _debug('koa:routes:auth')

  app.use(passport.initialize())

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

  // refresh token
  async function refresh (user, ctx) {
    const _d = {
      token: salt(),
      expires: Date.now() + expires
    }
    await user.update(_d).exec()
    ctx.body = { ...only(user.toJSON(), whiteProps), ..._d }
    ctx.status = 201
  }

  function respond (status, body, ctx) {
    body.code = STATUS_CODES[400]
    ctx.body = body
    ctx.status = status || 500
  }

  // login
  router.post('/login', (ctx, next) => {
    return passport.authenticate('local', {
      failWithError: true
    }, (user, info, status) => {
      if (user === false) {
        debug(info)
        respond(400, info, ctx)
      } else {
        return refresh(user, ctx)
      }
    })(ctx, next)
  })

  // check
  router.get('/check', (ctx, next) => {
    return passport.authenticate('bearer', {
      session: false
    }, async (user, info, status) => {
      if (user === false) {
        debug(info)
        respond(400, info, ctx)
      } else {
        await refresh(user, ctx)
      }
    })(ctx, next)
  })

  // signup
  router.post('/signup', async ctx => {
    const {
      username,
      password
    } = ctx.request.body
    const user = await User.create({ username, password })
    ctx.body = only(user.toJSON(), whiteProps)
  })

  // logout
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
      }
    }

    if (ctx.body && ctx.body.access_token) {
      if (token) {
        return respond(400, {
          message: 'Multiple tokens found.'
        }, ctx)
      }
      token = ctx.body.access_token
    }

    if (ctx.query && ctx.query.access_token) {
      if (token) {
        return respond(400, {
          message: 'Multiple tokens found.'
        }, ctx)
      }
      token = ctx.query.access_token
    }

    if (!token) {
      return respond(400, {
        message: 'Token not found.'
      }, ctx)
    }

    const user = await User.findOne({ token }).exec((err, doc) => {
      if (err) {
        return respond(400, {
          message: err.errmsg
        }, ctx)
      }
      if (!doc) {
        return respond(404, {
          message: 'Token not found.'
        }, ctx)
      }

      return doc
    })

    await user.update({
      token: '',
      expires: 0
    }).exec()

    ctx.body = {}
    ctx.status = 200
  })
}
