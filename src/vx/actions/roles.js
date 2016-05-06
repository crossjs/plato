import { GET_ROLES, CREATE_ROLE, DELETE_ROLE, UPDATE_ROLE } from '../types'
import { GET, POST, DELETE, PATCH } from 'utils/ajax'

export default {
  getRoles ({ dispatch }) {
    dispatch(GET_ROLES, GET('/apis/roles'))
  },

  createRole ({ dispatch }, payload) {
    dispatch(CREATE_ROLE, POST('/apis/roles', {
      body: payload
    }))
  },

  deleteRole ({ dispatch }, payload) {
    dispatch(DELETE_ROLE, DELETE(`/apis/roles/${payload._id}`))
  },

  updateRole ({ dispatch }, { _id, ...payload }) {
    dispatch(UPDATE_ROLE, PATCH(`/apis/roles/${_id}`, {
      body: payload
    }))
  }
}
