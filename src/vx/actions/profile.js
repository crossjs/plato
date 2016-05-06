import { GET_PROFILE, UPDATE_PROFILE } from '../types'
import { GET, PATCH } from 'utils/ajax'

export default {
  getProfile ({ dispatch }) {
    dispatch(GET_PROFILE, GET('/apis/user/profile'))
  },

  updateProfile ({ dispatch }, payload) {
    dispatch(UPDATE_PROFILE, PATCH('/apis/user/profile', {
      body: payload
    }))
  }
}
