// import constants from '../constants'

// function makeAction (type) {
//   return ({ dispatch }, ...args) => dispatch(type, ...args)
// }
//
// function makeName (type) {
//   return type.toLowerCase().replace(/_([0-9a-z])/g, (_, $1) => {
//     return $1.toUpperCase()
//   })
// }

const actions = {}

// Object.keys(constants).forEach(key => {
//   // skip _X_Y_Z
//   if (key.charAt(0) === '_') {
//     return
//   }
//   actions[makeName(key)] = makeAction(key)
// })

// customize, override defaults
const gettersContext = require.context('./', true, /^((?!index).)*\.js$/)
gettersContext.keys().forEach(key => {
  Object.assign(actions, gettersContext(key))
})

export default actions
