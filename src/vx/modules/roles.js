import {
  SET_ROLES
} from '../constants'

const state = {
  roles: []
}

const mutations = {
  [SET_ROLES] (state, roles) {
    state.roles = roles
  }
}

export default {
  state,
  mutations
}
