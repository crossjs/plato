import createPersist from 'vuex-localstorage'
import request from 'plato-request'

import {
  ONE_WEEK,
  PROMISE_SUCCESS
} from '../constants'

const ENV_KEY = 'ENV_KEY'
const SET_ENV = 'SET_ENV'
const SET_ENV_I18N = 'SET_ENV_I18N'

const persist = createPersist(ENV_KEY, {
  lang: navigator.language.split('-')[0],
  i18n: null,
  authorized: false
}, {
  expires: ONE_WEEK
})

const state = persist.get()

const getters = {
  lang: state => state.lang,
  i18n: state => state.i18n,
  authorized: state => state.authorized
}

const actions = {
  setEnv ({ commit }, payload) {
    commit(SET_ENV, payload)

    if (payload.lang) {
      commit(SET_ENV_I18N, request({
        url: `./i18n/${payload.lang}.json`
      }))
    }
  }
}

const mutations = {
  [SET_ENV] (state, payload) {
    Object.assign(state, payload)
    persist.set(state)
  },

  [SET_ENV_I18N] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      Object.assign(state, {
        i18n: payload
      })
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
