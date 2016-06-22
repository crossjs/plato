import {
  ADD_TOAST,
  DELETE_TOAST
} from '../types'

import {
  PROMISE_SUCCESS,
  PROMISE_FAILURE
} from '../constants'

const state = {
  toasts: []
}

const mutations = {
  [ADD_TOAST] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS || meta === PROMISE_FAILURE) {
      payload._id = Date.now()
      state.toasts.push(payload)
    }
  },

  [DELETE_TOAST] (state, { payload }) {
    state.toasts.$remove(payload)
  }
}

export default {
  state,
  mutations
}
