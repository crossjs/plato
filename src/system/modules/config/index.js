import store from './store'

export default ({ registerModule, registerRoutes }, options = {}, next) => {
  const { name = 'config', prefix = 'config' } = options

  registerModule({ [name]: store })

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
  })
}
