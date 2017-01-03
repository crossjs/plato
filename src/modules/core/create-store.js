import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

export default ({ version, modules, routes }, { scope }) => {
  const SET_CORE = rnd('SET_CORE')

  // 将相同 scope 的模块合并
  // 一般情况下要避免此种情况发生，因为会使模块混乱，难于维护
  const store = modules[scope] || {}

  // 此处引入版本号，为了避免版本更新导致的缓存数据冲突
  const persist = createPersist(`${version}/${scope}`, {
    authorized: false,
    routes,
    ...(store.state || null)
  }, {
    // 自定义合并策略，如果存在值则忽略
    merge (initialState, presistedState) {
      const _state = Object.assign({}, initialState)
      for (const i in presistedState) {
        if (!(i in initialState)) {
          _state[i] = presistedState[i]
        }
      }
      return _state
    },
    expires: ONE_WEEK
  })

  const state = persist.get()

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
