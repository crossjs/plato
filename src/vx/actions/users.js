import { GET_USERS, DELETE_USER } from '../constants'
import { GET, DELETE } from 'utils/ajax'

export default {
  getUsers ({ dispatch }) {
    dispatch(GET_USERS, GET('/apis/users'))
  },

  deleteUser ({ dispatch }, payload) {
    dispatch(DELETE_USER, DELETE(`/apis/users/${payload._id}`))
  }
}
