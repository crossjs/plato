import _debug from 'debug'
import Page from '../models/page'
import { check } from '../passport'

export default (app, router) => {
  const debug = _debug('koa:routes:page')

  debug('initialize')

  router.get('/pages', check, async ctx => {
    const pages = await Page.find({}).exec()
    ctx.body = pages
  })

  router.post('/pages', check, async ctx => {
    const { title, content } = ctx.request.body
    const user = ctx._user._id
    const page = await Page.create({ user, title, content })
    ctx.body = page.toJSON()
  })

  router.get('/pages/:id', check, async ctx => {
    const page = await Page.findById(ctx.params.id).exec()
    ctx.body = page
  })
}
