import webpackDevMiddleware from 'webpack-dev-middleware'
import applyExpressMiddleware from './apply-express-middleware'

export default (compiler, config) => {
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.compiler_public_path,
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  })

  return async function koaWebpackDevMiddleware (ctx, next) {
    /*eslint prefer-const: 0*/
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end (content) {
        ctx.body = content
      },
      setHeader () {
        ctx.set.apply(ctx, arguments)
      }
    })

    if (hasNext) {
      await next()
    }
  }
}
