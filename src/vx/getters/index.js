import state from '../state'

const getters = {}

// defaults
Object.keys(state).forEach(key => {
  getters[key] = state => {
    return state[key]
  }
})

// customize, override defaults
const gettersContext = require.context('./', true, /^((?!index).)*\.js$/)
gettersContext.keys().forEach(key => {
  Object.assign(getters, gettersContext(key))
}, {})

export default getters
