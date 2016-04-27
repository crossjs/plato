const modulesContext = require.context('./modules/', true, /^((?!index).)*\.js$/)

export default modulesContext.keys().reduce((modules, key) => {
  modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key)
  return modules
}, {})
