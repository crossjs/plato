import createPersist from 'vuex-localstorage'

import {
  GET_AUTH,
  DELETE_AUTH,
  CREATE_USER
} from '../types'

import {
  AUTH_KEY,
  PROMISE_SUCCESS
} from '../constants'

const persist = createPersist(AUTH_KEY)

const state = {
  auth: persist.get()
}

const mutations = {
  [GET_AUTH] (state, { meta, payload } = {}) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = payload
      // save to localStorage
      persist.set(payload)
    }
  },

  [DELETE_AUTH] (state, { meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = null
      // save to localStorage
      persist.set(null)
    }
  },

  [CREATE_USER] (state, { meta, payload }) {
    if (meta === PROMISE_SUCCESS) {
      state.auth = payload
      // save to localStorage
      persist.set(payload)
    }
  }
}

export default {
  state,
  mutations
}
