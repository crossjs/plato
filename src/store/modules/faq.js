import Promise from 'nuo'
import createPersist from 'vuex-localstorage'
import { createAction, handleAction, $inject } from 'vuex-actions'
import Normalizer from 'utils/normalizer'
import request from 'utils/request'

import {
  ONE_SECOND
} from '../constants'

/**
 * just for test
 */

const FAQ_KEY = 'FAQ_KEY'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

function fakeId () {
  return new Date().getTime().toString(32).concat(Math.random().toString(32))
}

const faq = {
  cache: [],
  find () {
    return request('./db/faq.json').then(data => {
      this.cache = data
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, data)
      })
    })
  },
  save (data) {
    data.id = fakeId()
    this.cache.push(data)
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, data)
    })
  },
  remove (_id) {
    this.cache.forEach(({ id }, index) => {
      if (id === _id) {
        this.cache.splice(index, 1)
      }
    })
    return Promise.resolve({})
  }
}

const normalizer = new Normalizer({
  key ({ id }) {
    return id || fakeId()
  }
})

const persist = createPersist(FAQ_KEY, {
  faq_is_fetching: false,
  entities: {}
}, {
  expires: ONE_SECOND * 30
})

const state = persist.get()

const getters = {
  faq_items: state => state.entities,
  faq_is_fetching: state => state.faq_is_fetching
}

const actions = {
  getItems: createAction(GET_ITEMS, () => faq.find()),
  addItem: createAction(ADD_ITEM, payload => faq.save(payload)),
  deleteItem: createAction(DELETE_ITEM, payload => ({
    // destroy, removing data from remote
    _: faq.remove(payload),
    // then return id (payload) for removing data from store
    id: $inject(() => payload)('_')
  }))
}

const mutations = {
  [GET_ITEMS]: handleAction({
    pending (state) {
      state.faq_is_fetching = true
    },
    success (state, mutation) {
      state.faq_is_fetching = false
      const { entities } = normalizer.normalize(mutation)
      state.entities = { ...state.entities, ...entities }
      persist.set(state)
    },
    error (state) {
      state.faq_is_fetching = false
    }
  }),

  [ADD_ITEM]: handleAction({
    pending (state) {
      state.faq_is_fetching = true
    },
    success (state, mutation) {
      state.faq_is_fetching = false
      const { entities } = normalizer.normalize([mutation])
      state.entities = { ...state.entities, ...entities }
      persist.set(state)
    },
    error (state) {
      state.faq_is_fetching = false
    }
  }),

  [DELETE_ITEM]: handleAction({
    pending (state) {
      state.faq_is_fetching = true
    },
    success (state, { id }) {
      state.faq_is_fetching = false
      const { entities } = state
      delete entities[id]
      state.entities = { ...entities }
      persist.set(state)
    },
    error (state) {
      state.faq_is_fetching = false
    }
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}
