// import _debug from 'debug'
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import crypto from 'crypto'
import User from '../models/user'

export default (app, router) => {
  // const debug = _debug('koa:routes:auth')

  app.use(passport.initialize())
  app.use(passport.session())

  router.post('/login', passport.authenticate('local'))

  passport.use(new LocalStrategy((username, password, cb) => {
    User.findOne({
      username: username.toLowerCase()
    }).exec((err, user) => {
      if (err) {
        return cb(null, false)
      }
      if (!user) {
        return cb(null, false)
      }
      const len = 128
      const iterations = 12000
      const hash = crypto.pbkdf2Sync(password, user.salt, iterations, len, 'sha256').toString('base64')
      if (hash !== user.password) {
        return cb(null, false)
      }
      return cb(null, user)
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, done)
  })
}
