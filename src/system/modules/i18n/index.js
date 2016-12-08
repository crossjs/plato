import store from './store'

export default (options = {}) => {
  const { name = 'auth', prefix = 'auth' } = options

  return (context, next) => {
    const { modules } = context

    modules[name] = store

    next(context, context => {
      __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
    })
  }
}
