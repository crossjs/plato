// load routes in modules
const modulesContext = require.context('../modules/', true, /routes\.js$/)
const regexp = /(^\.(\/core)?)|(\/routes\.js$)/g

// todo: use `PLATO.use(...)` for registering modules?

export default modulesContext.keys().reduce((arr, key) => {
  const prefix = key.replace(regexp, '')
  return arr.concat(modulesContext(key).map(route => {
    route.path = prefix + route.path
    return route
  }))
}, [])
