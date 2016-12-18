import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default modules => {
  return new Store({
    strict: __DEV__,
    plugins: __DEV__ ? [createLogger()] : [],
    modules
  })
}
