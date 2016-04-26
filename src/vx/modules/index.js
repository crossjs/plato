const modulesContext = require.context('./', true, /^((?!index).)*\.js$/)

const modules = {}

modulesContext.keys().forEach(key => {
  modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key)
}, {})

export default modules
