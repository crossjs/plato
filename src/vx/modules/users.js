import {
  SET_USERS,
  DELETE_USER
} from '../constants'

const state = {
  users: []
}

const mutations = {
  [SET_USERS] (state, users) {
    state.users = users
  },

  [DELETE_USER] (state, user) {
    state.users.$remove(user)
  }
}

export default {
  state,
  mutations
}
