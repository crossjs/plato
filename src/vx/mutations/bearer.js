import {
  _BEARER_KEY,
  SET_BEARER
} from '../constants'

export default {
  [SET_BEARER] (state, bearer) {
    state.bearer = bearer
    // save to localStorage
    localStorage.setItem(_BEARER_KEY, JSON.stringify(bearer))
  }
}
