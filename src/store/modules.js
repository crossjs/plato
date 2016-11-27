// load stores in modules
const modulesContext = require.context('../modules/', true, /store\.js$/)

export default modulesContext.keys().reduce((modules, key) => {
  modules[key.replace(/(^\.\/)|(\/store\.js$)/g, '')] = modulesContext(key)
  return modules
}, {})
