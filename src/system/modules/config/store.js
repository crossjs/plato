import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

const SET_CONFIG = rnd('SET_CONFIG')

const persist = createPersist('config', {}, {
  expires: ONE_WEEK
})

const state = persist.get()

const getters = {}

const actions = {
  setConfig: createAction(SET_CONFIG)
}

const mutations = {
  [SET_CONFIG]: handleAction((state, mutation) => {
    Object.assign(state, mutation)
    persist.set(state)
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}
