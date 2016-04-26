import {
  SET_PROGRESS
} from '../constants'

export default {
  [SET_PROGRESS] (state, progress) {
    state.progress = progress
  }
}
