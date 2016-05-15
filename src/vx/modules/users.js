import {
  GET_USERS,
  PAGINATE_USERS,
  GET_USER,
  DELETE_USER,
  UPDATE_USER
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  users: {
    count: 0,
    items: [],
    query: {}
  }
}

const mutations = {
  [GET_USERS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      Object.assign(state.users, payload)
    }
  },

  [PAGINATE_USERS] (state, { payload }) {
    Object.assign(state.users, payload)
  },

  [GET_USER] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state.users
      const found = items.some((user, index) => {
        if (user._id === payload._id) {
          items.splice(index, 1, payload)
          return true
        }
      })
      if (!found) {
        state.users.count += 1
        items.push(payload)
      }
    }
  },

  [DELETE_USER] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state.users
      items.some((user, index) => {
        if (user._id === payload._id) {
          items.splice(index, 1)
          state.users.count -= 1
          return true
        }
      })
    }
  },

  [UPDATE_USER] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state.users
      items.some((user, index) => {
        if (user._id === payload._id) {
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
