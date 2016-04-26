const stateContext = require.context('./', true, /^((?!index).)*\.js$/)

export default stateContext.keys().reduce((state, key) => {
  return Object.assign(state, stateContext(key))
}, {})
