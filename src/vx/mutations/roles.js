import {
  SET_ROLES
} from '../constants'

export default {
  [SET_ROLES] (state, roles) {
    state.roles = roles
  }
}
