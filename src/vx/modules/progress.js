import {
  SET_PROGRESS
} from '../constants'

const state = {
  progress: 0
}

const mutations = {
  [SET_PROGRESS] (state, progress) {
    state.progress = progress
  }
}

export default {
  state,
  mutations
}
