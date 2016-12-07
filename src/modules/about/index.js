import { createRoutes } from './routes'

export default (options = {}) => {
  const { name = 'about', prefix = 'about' } = options

  return (context, next) => {
    const { routes } = context
    context.routes = routes.concat(createRoutes({ prefix }))
    // call next with callback
    // callback will be executed after bootstrap
    next(context, context => {
      __PROD__ || console.log(`use module "${name}", with prefix "${prefix}"`)
    })
  }
}
