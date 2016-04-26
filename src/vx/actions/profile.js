import { GET_PROFILE, UPDATE_PROFILE } from '../constants'
import { GET, PATCH } from 'utils/ajax'

export default {
  getProfile ({ dispatch }) {
    GET('/apis/user/profile')
    .then(json => {
      dispatch(GET_PROFILE, json)
    })
  },
  updateProfile ({ dispatch }, payload) {
    PATCH('/apis/user/profile', {
      body: payload
    })
    .then(json => {
      dispatch(UPDATE_PROFILE, json)
    })
  }
}
