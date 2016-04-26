import modules from '../modules'

const getters = {}

// defaults
Object.keys(modules).forEach(key => {
  getters[key] = state => {
    return state[key][key]
  }
})

// customize, override defaults
const gettersContext = require.context('./', true, /^((?!index).)*\.js$/)
gettersContext.keys().forEach(key => {
  Object.assign(getters, gettersContext(key))
}, {})

export default getters
