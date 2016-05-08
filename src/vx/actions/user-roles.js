import { GET_USER_ROLES, CREATE_USER_ROLE, DELETE_USER_ROLE } from '../types'
import { GET, POST, DELETE } from 'utils/ajax'

export default {
  getUserRoles ({ dispatch }, { username }) {
    dispatch(GET_USER_ROLES, GET(`/apis/users/${username}/roles`))
  },

  createUserRole ({ dispatch }, { username, ...payload }) {
    dispatch(CREATE_USER_ROLE, POST(`/apis/users/${username}/roles`, {
      body: payload
    }))
  },

  deleteUserRole ({ dispatch }, { username, name }) {
    dispatch(DELETE_USER_ROLE, DELETE(`/apis/users/${username}/roles/${name}`))
  }
}
