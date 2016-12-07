import store from './store'
import { createRoutes } from './routes'

export default (options = {}) => {
  const { name = 'faq', prefix = 'faq' } = options

  return (context, next) => {
    const { modules, routes } = context
    modules[name] = store
    context.routes = routes.concat(createRoutes({ prefix }))
    // call next with callback
    // callback will be executed after bootstrap
    next(context, context => {
      __PROD__ || console.log(`use module "${name}", with prefix "${prefix}"`)
    })
  }
}
