import webpackHotMiddleware from 'webpack-hot-middleware'
import applyExpressMiddleware from './apply-express-middleware'

export default (compiler/*, config*/) => {
  const middleware = webpackHotMiddleware(compiler)
  return async function koaWebpackHMR (ctx, next) {
    /*eslint prefer-const: 0*/
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext && next) {
      await next()
    }
  }
}
