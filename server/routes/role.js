// import _debug from 'debug'
import Role from '../models/role'
import { authCheck } from '../tools/passport'

export default (app, router) => {
  // const debug = _debug('koa:routes:role')

  router.get('/roles', authCheck, async ctx => {
    const roles = await Role.find({}).exec()
    ctx.body = roles
  })

  router.get('/roles/:id', authCheck, async ctx => {
    const role = await Role.findById(ctx.params.id).exec()
    ctx.body = role
  })
}
