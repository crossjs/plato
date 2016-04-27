import { GET_BEARER, DELETE_BEARER } from '../constants'
import { POST, DELETE } from 'utils/ajax'

export default {
  getBearer ({ dispatch }, payload) {
    dispatch(GET_BEARER, POST('/apis/login', {
      body: payload
    }))
  },

  deleteBearer ({ dispatch }) {
    dispatch(DELETE_BEARER, DELETE('/apis/user/logout'))
  }
}
