export default (options = {}) => {
  const { name = 'core', prefix = '/core' } = options

  __PROD__ || console.log(`use module "${name}", with prefix "${prefix}"`)

  return (modules, routes, next) => {
    modules[name] = {
      // add routes to store
      state: {
        routes
      }
    }
    next(modules, routes)
  }
}
