import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

export default ({ modules, routes, translations }, { scope }) => {
  const SET_CORE = rnd('SET_CORE')

  // merging the store has the same key of `scope`
  const store = modules[scope] || {}

  const persist = createPersist(scope, {
    authorized: false,
    routes,
    ...(store.state || null)
  }, {
    expires: ONE_WEEK
  })

  const state = persist.get()

  const getters = {
    authorized: state => state.authorized,
    routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized)))),
    ...(store.getters || null)
  }

  const actions = {
    setCore: createAction(SET_CORE),
    ...(store.actions || null)
  }

  const mutations = {
    [SET_CORE]: handleAction((state, mutation) => {
      Object.assign(state, mutation)
      persist.set(state)
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
