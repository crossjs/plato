const actionsContext = require.context('./actions/', true, /^((?!index).)*\.js$/)

export default actionsContext.keys().reduce((actions, key) => {
  return Object.assign(actions, actionsContext(key))
}, {})
