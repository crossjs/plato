import {
  SET_PROFILE
} from '../constants'

export default {
  [SET_PROFILE] (state, profile) {
    state.profile = profile
  }
}
