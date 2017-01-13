import { createAction, handleAction } from 'vuex-actions'

export default ({ version, modules, routes }, { scope }) => {
  const SET_CORE = 'SET_CORE'

  // 将相同 scope 的模块合并
  // 一般情况下要避免此种情况发生，因为会使模块混乱，难于维护
  const store = modules[scope] || {}

  const state = {
    authorized: false,
    routes,
    ...(store.state || null)
  }

  const getters = {
    authorized: state => state.authorized,
    routes: ({ routes, authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized)))),
    ...(store.getters || null)
  }

  const actions = {
    setCore: createAction(SET_CORE),
    ...(store.actions || null)
  }

  const mutations = {
    [SET_CORE]: handleAction((state, mutation) => {
      Object.assign(state, mutation)
    }),
    ...(store.mutations || null)
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
