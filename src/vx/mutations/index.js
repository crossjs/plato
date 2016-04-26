const mutationsContext = require.context('./', true, /^((?!index).)*\.js$/)

export default mutationsContext.keys().reduce((mutations, key) => {
  return Object.assign(mutations, mutationsContext(key))
}, {})
