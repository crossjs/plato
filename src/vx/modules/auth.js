import {
  _BEARER_KEY,
  GET_BEARER,
  DELETE_BEARER,
  CREATE_USER,
  PROMISE_SUCCESS
} from '../constants'

const state = {
  bearer: (function () {
    try {
      return JSON.parse(localStorage.getItem(_BEARER_KEY))
    } catch (e) {
      // log e
      return null
    }
  })(),
  username: null
}

const mutations = {
  [GET_BEARER] (state, { meta, payload } = {}) {
    if (meta === PROMISE_SUCCESS) {
      state.bearer = payload
      // save to localStorage
      localStorage.setItem(_BEARER_KEY, JSON.stringify(payload))
    }
  },

  [DELETE_BEARER] (state, { meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.bearer = null
      // save to localStorage
      localStorage.setItem(_BEARER_KEY, JSON.stringify(null))
    }
  },

  [CREATE_USER] (state, { meta, payload }) {
    if (meta === PROMISE_SUCCESS) {
      // save to localStorage
      localStorage.setItem(_BEARER_KEY, JSON.stringify(null))
    }
  }
}

export default {
  state,
  mutations
}
