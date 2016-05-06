import {
  GET_ROLES,
  DELETE_ROLE,
  UPDATE_ROLE
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  roles: []
}

const mutations = {
  [GET_ROLES] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.roles = payload
    }
  },

  [DELETE_ROLE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.roles.some((role, index) => {
        if (role._id === payload._id) {
          state.roles.splice(index, 1)
          return true
        }
      })
    }
  },

  [UPDATE_ROLE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.roles.some((role, index) => {
        if (role._id === payload._id) {
          state.roles.$set(index, payload)
          return true
        }
      })
    }
  }
}

export default {
  state,
  mutations
}
