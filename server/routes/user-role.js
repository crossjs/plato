import _debug from 'debug'
import UserRole from '../models/user-role'
import { check } from '../passport'

export default (app, router) => {
  const debug = _debug('koa:routes:user-role')

  debug('initialize')

  router.get('/users/:user/roles', check, async ctx => {
    const { user } = ctx.params
    const userRoles = await UserRole.find({ user }).exec()
    ctx.body = userRoles
  })

  router.post('/users/:user/roles', check, async ctx => {
    const { user } = ctx.params
    const { role } = ctx.request.body
    const userRole = await UserRole.create({ user, role })
    ctx.body = userRole.toJSON()
  })

  router.get('/users/:user/roles/:role', check, async ctx => {
    const { user, role } = ctx.params
    const userRole = await UserRole.findOne({ user, role }).exec()
    ctx.body = userRole
  })

  router.del('/users/:user/roles/:role', check, async ctx => {
    const { user, role } = ctx.params
    const userRole = await UserRole.findOneAndRemove({ user, role }).exec()
    ctx.body = userRole
  })
}
