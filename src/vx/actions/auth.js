import { GET_AUTH, DELETE_AUTH, CREATE_USER } from '../types'
import { POST, DELETE } from 'utils/ajax'

export default {
  getBearer ({ dispatch }, payload) {
    dispatch(GET_AUTH, POST('/apis/auth/login', {
      body: payload
    }))
  },

  deleteBearer ({ dispatch }) {
    dispatch(DELETE_AUTH, DELETE('/apis/auth/logout'))
  },

  createUser ({ dispatch }, payload) {
    dispatch(CREATE_USER, POST('/apis/auth/signup', {
      body: payload
    }))
  }
}
