import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

export default (initialState, { scope }) => {
  const SET_I18N = rnd('SET_I18N')

  const persist = createPersist(scope, initialState, {
    expires: ONE_WEEK
  })

  const state = persist.get()

  const getters = {
    lang: state => state.lang,
    translations: state => state.translations
  }

  const actions = {
    setI18n: createAction(SET_I18N)
  }

  const mutations = {
    [SET_I18N]: handleAction((state, mutation) => {
      Object.assign(state, mutation)
      persist.set(state)
    })
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
