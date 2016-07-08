import request from 'plato-request'

import {
  GET_COMMITS
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  commits: null
}

const getters = {
  commits: state => state.commits
}

const actions = {
  getCommits ({ commit }, payload) {
    commit(GET_COMMITS, request('{base}/commits?per_page=3&sha=', {
      params: {
        base: 'https://api.github.com/repos/crossjs/plato'
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }))
  }
}

const mutations = {
  [GET_COMMITS] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.commits = payload
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
