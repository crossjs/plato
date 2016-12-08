import store from './store'
import { createRoutes } from './routes'

export default ({ registerModule, registerRoutes }, options = {}, next) => {
  const { name = 'config', prefix = 'config' } = options

  registerModule({ [name]: store })
  registerRoutes(createRoutes({ prefix }))

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
  })
}
