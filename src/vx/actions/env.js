import { SET_ENV } from '../types'

export default {
  setEnv ({ dispatch }, payload) {
    dispatch(SET_ENV, payload)
  }
}
