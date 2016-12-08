import { createRoutes } from './routes'

export default ({ registerRoutes }, options = {}, next) => {
  const { name = 'demo', prefix = 'demo' } = options

  registerRoutes(createRoutes({ prefix }))

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
  })
}
