import {
  GET_ROLES,
  CREATE_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  roles: {
    // disable pagination
    count: -1,
    items: [],
    query: {}
  }
}

const mutations = {
  [GET_ROLES](state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      Object.assign(state.roles, payload)
    }
  },

  [CREATE_ROLE](state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.count += 1
      state.items.push(payload)
    }
  },

  [DELETE_ROLE](state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state
      items.some((role, index) => {
        if (role._id === payload._id) {
          items.splice(index, 1)
          state.count -= 1
          return true
        }
      })
    }
  },

  [UPDATE_ROLE](state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state.roles
      items.some((role, index) => {
        if (role._id === payload._id) {
          items.$set(index, payload)
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
