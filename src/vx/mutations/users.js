import {
  SET_USERS,
  DELETE_USER
} from '../constants'

export default {
  [SET_USERS] (state, users) {
    state.users = users
  },

  [DELETE_USER] (state, user) {
    state.users.$remove(user)
  }
}
