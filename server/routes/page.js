import _debug from 'debug'
import Page from '../models/page'
import authCheck from '../utils/authcheck'

export default (app, router) => {
  const debug = _debug('koa:routes:page')

  router.get('/pages', authCheck, async ctx => {
    const pages = await Page.find({}).exec()
    ctx.body = pages
  })

  router.get('/pages/:id', authCheck, async ctx => {
    const page = await Page.findById(ctx.params.id).exec()
    ctx.body = page
  })
}
