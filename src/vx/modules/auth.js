import {
  GET_BEARER,
  DELETE_BEARER,
  CREATE_USER
} from '../types'

import {
  BEARER_KEY,
  PROMISE_SUCCESS
} from '../constants'

const state = {
  auth: (function () {
    try {
      return JSON.parse(localStorage.getItem(BEARER_KEY))
    } catch (e) {
      // log e
      return null
    }
  })()
}

const mutations = {
  [GET_BEARER] (state, { meta, payload } = {}) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = payload
      // save to localStorage
      localStorage.setItem(BEARER_KEY, JSON.stringify(payload))
    }
  },

  [DELETE_BEARER] (state, { meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = null
      // save to localStorage
      localStorage.setItem(BEARER_KEY, JSON.stringify(null))
    }
  },

  [CREATE_USER] (state, { meta, payload }) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = payload
      // save to localStorage
      localStorage.setItem(BEARER_KEY, JSON.stringify(payload))
    }
  }
}

export default {
  state,
  mutations
}
