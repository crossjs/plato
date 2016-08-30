import createPersist from 'vuex-localstorage'
import db from 'store/db'

import {
  ONE_SECOND,
  PROMISE_PENDING,
  PROMISE_SUCCESS,
  PROMISE_FINALLY
} from '../constants'

const FAQ_KEY = 'FAQ_KEY'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

const persist = createPersist(FAQ_KEY, {
  entities: {},
  meta: {}
}, {
  expires: ONE_SECOND
})

const state = persist.get()

const getters = {
  faq_items: state => state.entities,
  faq_items_pending: ({ meta }) => meta.promise === PROMISE_PENDING && meta.type === GET_ITEMS,
  faq_items_finally: ({ meta }) => meta.promise === PROMISE_FINALLY && meta.type === GET_ITEMS,
  faq_create_pending: ({ meta }) => meta.promise === PROMISE_PENDING && meta.type === ADD_ITEM,
  faq_create_finally: ({ meta }) => meta.promise === PROMISE_FINALLY && meta.type === ADD_ITEM
}

const DB_CLASS = 'Faq'
const Faq = db.Object.extend(DB_CLASS)
const faq = new Faq()

const actions = {
  getItems ({ commit }) {
    commit({
      type: GET_ITEMS,
      payload: new db.Query(Faq).find(),
      meta: {
        type: GET_ITEMS
      }
    })
  },

  addItem ({ commit }, payload) {
    commit({
      type: ADD_ITEM,
      payload: faq.set(payload).save(),
      meta: {
        type: ADD_ITEM
      }
    })
  },

  deleteItem ({ commit }, payload) {
    commit({
      type: DELETE_ITEM,
      payload: db.Object.createWithoutData(DB_CLASS, payload).destroy(),
      // store id for remove
      meta: {
        type: DELETE_ITEM,
        id: payload
      }
    })
  }
}

const mutations = {
  [GET_ITEMS] (state, { payload, meta }) {
    state.meta = meta
    if (meta.promise === PROMISE_SUCCESS && payload) {
      const { entities } = state
      payload.forEach(item => {
        entities[item.id] = item.toJSON()
      })
      state.entities = { ...entities }
      persist.set(state)
    }
  },

  [ADD_ITEM] (state, { payload, meta }) {
    state.meta = meta
    if (meta.promise === PROMISE_SUCCESS && payload) {
      const { entities } = state
      entities[payload.id] = payload.toJSON()
      state.entities = { ...entities }
      persist.set(state)
    }
  },

  [DELETE_ITEM] (state, { meta }) {
    state.meta = meta
    if (meta.promise === PROMISE_SUCCESS) {
      const { entities } = state
      delete entities[meta.id]
      state.entities = { ...entities }
      persist.set(state)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
