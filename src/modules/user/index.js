import store from './store'
import { createRoutes } from './routes'

export default (options = {}) => {
  const { name = 'base', prefix = 'base' } = options

  return (context, next) => {
    const { modules, routes } = context

    modules[name] = store
    context.routes = routes.concat(createRoutes({ prefix }))

    next(context, context => {
      __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
    })
  }
}
