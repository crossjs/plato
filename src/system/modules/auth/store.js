import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

const SET_AUTHORIZED = rnd('SET_AUTHORIZED')

const persist = createPersist('auth', {
  authorized: false
}, {
  expires: ONE_WEEK
})

const state = persist.get()

const getters = {
  authorized: state => state.authorized
}

const actions = {
  setAuthorized: createAction(SET_AUTHORIZED)
}

const mutations = {
  [SET_AUTHORIZED]: handleAction((state, mutation) => {
    state.authorized = mutation
    persist.set(state)
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}
