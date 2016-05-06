import { GET_USERS, DELETE_USER, UPDATE_USER } from '../types'
import { GET, DELETE, PATCH } from 'utils/ajax'

export default {
  getUsers ({ dispatch }) {
    dispatch(GET_USERS, GET('/apis/users'))
  },

  deleteUser ({ dispatch }, payload) {
    dispatch(DELETE_USER, DELETE(`/apis/users/${payload._id}`))
  },

  updateUser ({ dispatch }, { _id, ...payload }) {
    dispatch(UPDATE_USER, PATCH(`/apis/users/${_id}`, {
      body: payload
    }))
  }
}
