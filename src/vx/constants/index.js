const constantsContext = require.context('./', true, /^((?!index).)*\.js$/)

export default constantsContext.keys().reduce((constants, key) => {
  return Object.assign(constants, constantsContext(key))
}, {})
