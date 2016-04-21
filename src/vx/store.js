import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import {
  BEARER_KEY,
  SET_BEARER,
  SET_PROFILE,
  ADD_TOAST,
  DELETE_TOAST,
  CLEAR_TOASTS,
  SET_USERS,
  SET_PAGES
} from './constants'

Vue.use(Vuex)

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  localStorage.clear()
}

const state = {
  pages: [],
  users: [],
  toasts: [],
  profile: {},
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

  [SET_PROFILE] (state, profile) {
    state.profile = profile
  },

  [ADD_TOAST] (state, toast) {
    state.toasts.push(toast)
  },

  [DELETE_TOAST] (state, toast) {
    state.toasts.$remove(toast)
  },

  [CLEAR_TOASTS] (state) {
    state.toasts = []
  },

  [SET_USERS] (state, users) {
    state.users = users
  },

  [SET_PAGES] (state, pages) {
    state.pages = pages
  }

}

export default new Vuex.Store({
  state,
  mutations,
  middlewares
})
