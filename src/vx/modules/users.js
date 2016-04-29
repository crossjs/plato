import {
  GET_USERS,
  DELETE_USER,
  UPDATE_USER,
  PROMISE_SUCCESS
} from '../constants'

const state = {
  users: []
}

const mutations = {
  [GET_USERS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.users = payload
    }
  },

  [DELETE_USER] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.users.some((user, index) => {
        if (user._id === payload._id) {
          state.users.splice(index, 1)
          return true
        }
      })
    }
  },

  [UPDATE_USER] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.users.some((user, index) => {
        if (user._id === payload._id) {
          state.users[index] = payload
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
