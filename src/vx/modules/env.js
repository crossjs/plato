import createPersist from 'vuex-localstorage'

import {
  SET_ENV
} from '../types'

import {
  ENV_KEY
} from '../constants'

const persist = createPersist(ENV_KEY, {
  lang: navigator.language.split('-')[0],
  authorized: false
})

const state = {
  env: persist.get()
}

const mutations = {
  [SET_ENV] (state, { payload }) {
    state.env = Object.assign({}, state.env, payload)
    persist.set(state.env)
  }
}

export default {
  state,
  mutations
}
