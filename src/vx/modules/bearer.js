import {
  _BEARER_KEY,
  GET_BEARER,
  DELETE_BEARER
} from '../constants'

const state = {
  bearer: (function () {
    try {
      return JSON.parse(localStorage.getItem(_BEARER_KEY))
    } catch (e) {
      // log e
      return null
    }
  })()
}

const mutations = {
  [GET_BEARER] (state, bearer) {
    state.bearer = bearer
    // save to localStorage
    localStorage.setItem(_BEARER_KEY, JSON.stringify(bearer))
  },

  [DELETE_BEARER] (state) {
    state.bearer = null
    // save to localStorage
    localStorage.setItem(_BEARER_KEY, JSON.stringify(null))
  }
}

export default {
  state,
  mutations
}
