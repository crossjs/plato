import { createAction, handleAction, $inject } from 'vuex-actions'
import Normalizer from 'platojs/util/normalizer'
import { get, post, patch, put, del } from 'platojs/request'
import merge from 'platojs/util/cheap-merge'

/**
 * Template for standard REST
 *
 * @param  {String} source       REST 的 source
 * @param  {Object} getters      Vuex 的 getters
 * @param  {Object} options      Request 的默认配置
 * @return {Object}              Vuex 的 module
 */
export default ({
    source,
    initialState,
    getters,
    ...options }) => {
  const LIST = 'LIST'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'
  const PUT = 'PUT'
  const GET = 'GET'

  const REST = {
    list (query) {
      return get(source, merge({}, options, {
        method: 'GET',
        query
      }))
    },
    post (body) {
      return post(source, merge({}, options, {
        body
      }))
    },
    delete (id) {
      return del(`${source}/{id}`, merge({}, options, {
        params: { id }
      }))
    },
    patch (id, body) {
      return patch(`${source}/{id}`, merge({}, options, {
        params: { id },
        body
      }))
    },
    put (id, body) {
      return put(`${source}/{id}`, merge({}, options, {
        params: { id },
        body
      }))
    },
    get (id) {
      return get(`${source}/{id}`, merge({}, options, {
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
      // destroy, removing data from 'platojs/components/core/remote
      _: REST.delete(id),
      // then return id (payload) for removing data from 'platojs/components/core/store
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
