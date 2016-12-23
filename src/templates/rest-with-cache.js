import Promise from 'nuo'
import createPersist from 'vuex-localstorage'
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
 * @param  {Number} [expires=0]  持久化数据过期时间，0 为不过期
 * @param  {Number} [memcache=0] 幂等请求缓存过期时间，0 为不缓存
 * @param  {String} source       REST 的 source
 * @param  {Object} getters      Vuex 的 getters
 * @param  {Object} options      Request 的默认配置
 * @return {Object}              Vuex 的 module
 */
export default ({
    namespace = '',
    expires = 0,
    memcache = 0,
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

  let cache

  if (memcache) {
    cache = createPersist(namespace, {}, {
      provider: (function (storage) {
        return {
          getItem (key) {
            return storage[key]
          },
          setItem (key, val) {
            storage[key] = val
          }
        }
      })({}), // store to memory
      serialize: val => val,
      deserialize: val => val,
      expires: memcache
    })
  }

  const REST = {
    list (query) {
      const key = 'list'
      if (cache) {
        // 为了性能考虑，只缓存最近的一次查询
        const value = cache.get(key)
        if (value && value.query === query && value.result) {
          return Promise.resolve(value.result)
        }
      }
      return request(source, merge({}, options, {
        query
      })).then(result => {
        if (cache) {
          cache.set(key, {
            query,
            result
          })
        }
        return result
      }).catch(err => { throw err })
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
      const key = `get-${id}`
      if (cache) {
        const value = cache.get(key)
        if (value && value.result) {
          return Promise.resolve(value.result)
        }
      }
      return request(`${source}/{id}`, merge({}, options, {
        params: { id }
      })).then(result => {
        if (cache) {
          cache.set(key, {
            result
          })
        }
        return result
      }).catch(err => { throw err })
    }
  }

  const normalizer = new Normalizer()

  const persist = createPersist(namespace, Object.assign({
    fetching: false,
    entities: {}
  }, initialState), {
    expires
  })

  const state = persist.get()

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
      persist.set(state)
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
        persist.set(state)
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
        persist.set(state)
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
