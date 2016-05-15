import {
  GET_PROFILE,
  UPDATE_PROFILE
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  profile: {
    // username: '',
    // state: 1,
    // created: 0
  }
}

const mutations = {
  [GET_PROFILE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.profile = payload
    }
  },

  [UPDATE_PROFILE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.profile = { ...state.profile, ...payload }
    }
  }
}

export default {
  state,
  mutations
}
