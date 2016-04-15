import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import {
  BEARER_KEY,
  SET_BEARER,
  ADD_TOAST,
  DELETE_TOAST,
  CLEAR_TOAST
} from './constants'

Vue.use(Vuex)

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

const state = {
  toasts: [],
  bearer: (function () {
    try {
      return JSON.parse(localStorage.getItem(BEARER_KEY) || '[]')
    } catch (e) {
      // log e
      return []
    }
  })()
}

const mutations = {

  [SET_BEARER] (state, bearer) {
    state.bearer = bearer
  },

  [ADD_TOAST] (state, toast) {
    state.toasts.push(toast)
  },

  [DELETE_TOAST] (state, toast) {
    state.toasts.$remove(toast)
  },

  [CLEAR_TOAST] (state, toast) {
    state.toasts = []
  }

}

export default new Vuex.Store({
  state,
  mutations,
  middlewares
})
