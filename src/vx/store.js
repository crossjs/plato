import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import { BEARER_KEY, SET_BEARER } from './constants'

Vue.use(Vuex)

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

const state = {
  bearer: JSON.parse(localStorage.getItem(BEARER_KEY) || '[]')
}

const mutations = {
  [SET_BEARER] (state, bearer) {
    state.bearer = bearer
  }
}

export default new Vuex.Store({
  state,
  mutations,
  middlewares
})
