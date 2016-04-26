import {
  GET_PROFILE,
  UPDATE_PROFILE
} from '../constants'

const state = {
  profile: {}
}

const mutations = {
  [GET_PROFILE] (state, profile) {
    state.profile = profile
  },
  [UPDATE_PROFILE] (state, profile) {
    state.profile = profile
  }
}

export default {
  state,
  mutations
}
