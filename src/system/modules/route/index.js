export default (context, options = {}, next) => {
  const { registerModule, routes } = context
  const { name = 'route', prefix = 'route' } = options

  registerModule({
    config: {
      // add routes to store
      state: {
        routes
      },
      getters: {
        routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
      }
    }
  })

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
  })
}
