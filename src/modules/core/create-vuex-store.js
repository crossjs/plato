import Vue from 'vue'
import Vuex, { Store } from 'vuex'
// should be removed in production
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default (modules, plugins) => {
  return new Store({
    strict: __DEV__,
    plugins: __DEV__ ? plugins.concat(createLogger()) : plugins,
    modules
  })
}
