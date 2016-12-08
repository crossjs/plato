import { createRoutes } from './routes'

export default ({ registerModule, registerRoutes }, options = {}, next) => {
  const { name = 'user', prefix = 'user' } = options

  registerRoutes(createRoutes({ prefix }))

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
  })
}
