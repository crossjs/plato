import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import middlewares from './middlewares'
import {
  BEARER_KEY
} from './constants'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

const state = {
  pages: [],
  roles: [],
  users: [],
  toasts: [],
  profile: {},
  progress: 0,
  bearer: (function () {
    try {
      return JSON.parse(localStorage.getItem(BEARER_KEY) || '[]')
    } catch (e) {
      // log e
      return []
    }
  })()
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  middlewares
})
