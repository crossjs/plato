import { GET_BEARER, DELETE_BEARER } from '../constants'
import { POST, DELETE } from 'utils/ajax'

export default {
  getBearer ({ dispatch }, payload) {
    POST('/apis/login', {
      body: payload
    })
    .then(json => {
      dispatch(GET_BEARER, json)
    })
  },
  deleteBearer ({ dispatch }) {
    DELETE('/apis/user/logout')
    .then(json => {
      dispatch(DELETE_BEARER)
    })
  }
}
