import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import middlewares from './middlewares'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  middlewares
})
