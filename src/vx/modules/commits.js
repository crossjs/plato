import createPersist from 'vuex-localstorage'
import request from 'plato-request'

import {
  GET_COMMITS
} from '../types'

import {
  COMMIT_KEY,
  ONE_MINUTE,
  PROMISE_SUCCESS
} from '../constants'

const persist = createPersist(COMMIT_KEY, {
  commits: null
}, {
  expires: ONE_MINUTE
})

const state = persist.get()

const getters = {
  commits: state => state.commits
}

const actions = {
  getCommits ({ commit }, payload) {
    commit(GET_COMMITS, request('{base}/commits?sha=', {
      params: {
        base: 'https://api.github.com/repos/crossjs/plato'
      },
      query: {
        per_page: 3
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
      persist.set(state)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
