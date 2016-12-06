import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import plugins from './plugins'

Vue.use(Vuex)

export default modules => {
  return new Store({
    strict: __DEV__,
    plugins,
    modules
  })
}
