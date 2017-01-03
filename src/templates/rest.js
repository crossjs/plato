import { createAction, handleAction, $inject } from 'vuex-actions'
import Normalizer from 'utils/normalizer'
import request from 'utils/request'
import merge from 'utils/merge'
import rnd from 'utils/rnd'

/**
 * Template for standard REST
 *
 *   如果环境支持 GET 请求的缓存，比如浏览器，则没有必要启用 memcache
 *
 * @param  {String} namespace    命名空间，用于生成 actions 与持久化
 * @param  {String} source       REST 的 source
 * @param  {Object} getters      Vuex 的 getters
 * @param  {Object} options      Request 的默认配置
 * @return {Object}              Vuex 的 module
 */
export default ({
    namespace = '',
    source,
    initialState,
    getters,
    ...options }) => {
  const LIST = rnd('LIST')
  const POST = rnd('POST')
  const DELETE = rnd('DELETE')
  const PATCH = rnd('PATCH')
  const PUT = rnd('PUT')
  const GET = rnd('GET')

  const REST = {
    list (query) {
      return request(source, merge({}, options, {
        query
      }))
    },
    post (body) {
      return request(source, merge({}, options, {
        method: 'POST',
        body
      }))
    },
    delete (id) {
      return request(`${source}/{id}`, merge({}, options, {
        method: 'DELETE',
        params: { id }
      }))
    },
    patch (id, body) {
      return request(`${source}/{id}`, merge({}, options, {
        method: 'PATCH',
        params: { id },
        body
      }))
    },
    put (id, body) {
      return request(`${source}/{id}`, merge({}, options, {
        method: 'PUT',
        params: { id },
        body
      }))
    },
    get (id) {
      return request(`${source}/{id}`, merge({}, options, {
        params: { id }
      }))
    }
  }

  const normalizer = new Normalizer()

  const state = Object.assign({
    fetching: false,
    entities: {}
  }, initialState)

  const actions = {
    list: createAction(LIST, query => REST.list(query)),
    post: createAction(POST, body => REST.post(body)),
    patch: createAction(PATCH, (id, body) => REST.patch(id, body)),
    put: createAction(PUT, (id, body) => REST.put(id, body)),
    get: createAction(GET, id => REST.get(id)),
    delete: createAction(DELETE, id => ({
      // destroy, removing data from 'components/core/remote
      _: REST.delete(id),
      // then return id (payload) for removing data from 'components/core/store
      id: $inject(() => id)('_')
    }))
  }

  const handleSingle = handleAction({
    pending (state) {
      state.fetching = true
    },
    success (state, mutation) {
      state.fetching = false
      const { entities } = normalizer.normalize([mutation])
      state.entities = { ...state.entities, ...entities }
    },
    error (state) {
      state.fetching = false
    }
  })

  const mutations = {
    [LIST]: handleAction({
      pending (state) {
        state.fetching = true
      },
      success (state, mutation) {
        state.fetching = false
        const { entities } = normalizer.normalize(mutation)
        state.entities = { ...state.entities, ...entities }
      },
      error (state) {
        state.fetching = false
      }
    }),
    [POST]: handleSingle,
    [PATCH]: handleSingle,
    [PUT]: handleSingle,
    [GET]: handleSingle,
    [DELETE]: handleAction({
      pending (state) {
        state.fetching = true
      },
      success (state, { id }) {
        state.fetching = false
        const { entities } = state
        delete entities[id]
        state.entities = { ...entities }
      },
      error (state) {
        state.fetching = false
      }
    })
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
