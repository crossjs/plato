import Router from 'koa-router'
import _debug from 'debug'

import auth from './auth'
import user from './user'
import role from './role'
import userRole from './user-role'
import page from './page'

export default app => {
  const debug = _debug('koa:routes')

  debug('initialize')

  // api routes
  const router = new Router({
    prefix: '/apis'
  })

  auth(app, router)
  user(app, router)
  role(app, router)
  userRole(app, router)
  page(app, router)

  // support different functions for different pages on the server
  app.use(router.routes())
  app.use(router.allowedMethods({
    throw: true
  }))
}
