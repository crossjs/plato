import _debug from 'debug'
import Role from '../models/role'
import { check } from '../passport'

export default (app, router) => {
  const debug = _debug('koa:routes:role')

  debug('initialize')

  router.get('/roles', check, async ctx => {
    const roles = await Role.find({}).exec()
    ctx.body = roles
  })

  router.post('/roles', check, async ctx => {
    const { name, desc, level } = ctx.request.body
    const role = await Role.create({ name, desc, level })
    ctx.body = role.toJSON()
  })

  router.get('/roles/:id', check, async ctx => {
    const role = await Role.findById(ctx.params.id).exec()
    ctx.body = role
  })
}
