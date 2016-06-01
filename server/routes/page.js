import _debug from 'debug'
import Page from '../models/page'
import { check } from '../passport'

export default (app, router) => {
  const debug = _debug('koa:routes:page')

  debug('initialize')

  router.get('/pages', check, async ctx => {
    const { $count = '', $offset = 0, $limit = 20 } = ctx.request.query
    const items = await Page.find({}).skip(+$offset).limit(+$limit).exec()
    const res = { items }
    if ($count) {
      res.count = await Page.find({}).count().exec()
    }
    ctx.body = res
  })

  router.post('/pages', check, async ctx => {
    const { title, content } = ctx.request.body
    const user = ctx._user._id
    const page = await Page.create({ user, title, content })
    ctx.body = page.toJSON()
  })

  router.del('/pages/:id', check, async ctx => {
    const page = await Page.findByIdAndRemove(ctx.params.id).exec()
    ctx.body = page.toJSON()
  })

  router.patch('/pages/:id', check, async ctx => {
    const { title, content } = ctx.request.body
    const page = await Page.findByIdAndUpdate(ctx.params.id, { title, content }, { new: true }).exec()
    ctx.body = page
  })

  router.get('/pages/:id', check, async ctx => {
    const page = await Page.findById(ctx.params.id).exec()
    ctx.body = page
  })
}
