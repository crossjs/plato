import { createAction, handleAction } from 'vuex-actions'

export default ({ routes }, { scope }) => {
  const SET_CORE = 'SET_CORE'

  const state = {
    authorized: false,
    routes
  }

  const getters = {
    authorized: state => state.authorized,
    routes: ({ routes, authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
  }

  const actions = {
    setCore: createAction(SET_CORE)
  }

  const mutations = {
    [SET_CORE]: handleAction((state, mutation) => {
      Object.assign(state, mutation)
    })
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
