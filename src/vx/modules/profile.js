import {
  GET_PROFILE,
  UPDATE_PROFILE
} from '../types'

const state = {
  profile: {}
}

const mutations = {
  [GET_PROFILE] (state, { payload }) {
    state.profile = payload
  },
  [UPDATE_PROFILE] (state, { payload }) {
    state.profile = payload
  }
}

export default {
  state,
  mutations
}
