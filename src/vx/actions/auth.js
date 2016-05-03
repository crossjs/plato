import { GET_BEARER, DELETE_BEARER, CREATE_USER } from '../constants'
import { POST, DELETE } from 'utils/ajax'

export default {
  getBearer ({ dispatch }, payload) {
    dispatch(GET_BEARER, POST('/apis/auth/login', {
      body: payload
    }))
  },

  deleteBearer ({ dispatch }) {
    dispatch(DELETE_BEARER, DELETE('/apis/auth/logout'))
  },

  createUser ({ dispatch }, payload) {
    dispatch(CREATE_USER, POST('/apis/auth/signup', {
      body: payload
    }))
  }
}
