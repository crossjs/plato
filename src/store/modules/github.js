import createPersist from 'vuex-localstorage'
import request from 'plato-request'

import {
  ONE_MINUTE,
  PROMISE_SUCCESS
} from '../constants'

const COMMIT_KEY = 'COMMIT_KEY'
const GET_COMMITS = 'GET_COMMITS'
const GET_REPOSITORY = 'GET_REPOSITORY'

const persist = createPersist(COMMIT_KEY, {
  commits: null,
  stars: 0,
  forks: 0
}, {
  expires: ONE_MINUTE
})

const state = persist.get()

const getters = {
  commits: state => state.commits,
  stars: state => state.stars,
  forks: state => state.forks
}

const base = 'https://api.github.com/repos/crossjs/plato'
const headers = {
  'Accept': 'application/vnd.github.v3+json'
}

const actions = {
  getRepository ({ commit }) {
    commit(GET_REPOSITORY, request('{base}', {
      params: {
        base
      },
      headers
    }))
  },

  getCommits ({ commit }) {
    commit(GET_COMMITS, request('{base}/commits', {
      params: {
        base
      },
      query: {
        per_page: 3,
        sha: 'next'
      },
      headers
    }))
  }
}

const mutations = {
  [GET_REPOSITORY] (state, { payload, meta }) {
    if (meta && meta.promise === PROMISE_SUCCESS) {
      state.stars = payload.stargazers_count
      state.forks = payload.forks_count
      persist.set(state)
    }
  },

  [GET_COMMITS] (state, { payload, meta }) {
    if (meta && meta.promise === PROMISE_SUCCESS) {
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
