import Vue from 'vue'
import Vuex from 'vuex-fsa'
import modules from './modules'
import middlewares from './middlewares'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  modules,
  middlewares
})
