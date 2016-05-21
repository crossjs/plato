import { getPersist, setPersist } from 'vuex-localstorage'

import {
  SET_ENV
} from '../types'

import {
  ENV_KEY
} from '../constants'

const state = {
  env: getPersist(ENV_KEY, {
    lang: navigator.language.split('-')[0]
  })
}

const mutations = {
  [SET_ENV] (state, { payload }) {
    state.env = Object.assign({}, state.env, payload)
    setPersist(ENV_KEY, state.env)
  }
}

export default {
  state,
  mutations
}
