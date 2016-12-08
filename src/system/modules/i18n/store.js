import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

const SET_I18N = rnd('SET_I18N')
const SET_LANG = rnd('SET_LANG')

const persist = createPersist('i18n', {
  lang: navigator.language.split('-')[0],
  i18n: {}
}, {
  expires: ONE_WEEK
})

const state = persist.get()

const getters = {
  lang: state => state.lang,
  i18n: state => state.i18n
}

const actions = {
  setLang: createAction(SET_LANG),
  setI18n: createAction(SET_I18N)
}

const mutations = {
  [SET_LANG]: handleAction((state, mutation) => {
    state.lang = mutation
    persist.set(state)
  }),
  [SET_I18N]: handleAction((state, mutation) => {
    state.i18n = { ...state.i18n, ...mutation }
    persist.set(state)
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}
