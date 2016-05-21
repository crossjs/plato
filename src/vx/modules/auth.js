import { getPersist, setPersist } from 'vuex-localstorage'

import {
  GET_AUTH,
  DELETE_AUTH,
  CREATE_USER
} from '../types'

import {
  AUTH_KEY,
  PROMISE_SUCCESS
} from '../constants'

const state = {
  auth: getPersist(AUTH_KEY)
}

const mutations = {
  [GET_AUTH] (state, { meta, payload } = {}) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = payload
      // save to localStorage
      setPersist(AUTH_KEY, payload)
    }
  },

  [DELETE_AUTH] (state, { meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = null
      // save to localStorage
      setPersist(AUTH_KEY, null)
    }
  },

  [CREATE_USER] (state, { meta, payload }) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = payload
      // save to localStorage
      setPersist(AUTH_KEY, payload)
    }
  }
}

export default {
  state,
  mutations
}
