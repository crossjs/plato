import { GET_USERS, PAGINATE_USERS, GET_USER, DELETE_USER, UPDATE_USER } from '../types'
import { GET, DELETE, PATCH, PAGINATE_QUERY } from 'utils/ajax'

export default {
  getUsers ({ dispatch }, { query = PAGINATE_QUERY } = {}) {
    dispatch(PAGINATE_USERS, { query })
    dispatch(GET_USERS, GET('/apis/users', { query }))
  },

  getUser ({ dispatch }, { _id }) {
    dispatch(GET_USER, GET(`/apis/users/${_id}`))
  },

  deleteUser ({ dispatch }, { _id }) {
    dispatch(DELETE_USER, DELETE(`/apis/users/${_id}`))
  },

  updateUser ({ dispatch }, { _id, ...payload }) {
    dispatch(UPDATE_USER, PATCH(`/apis/users/${_id}`, {
      body: payload
    }))
  }
}
