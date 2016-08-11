import createPersist from 'vuex-localstorage'
import db from 'store/db'

import {
  ONE_SECOND,
  FAQ_KEY,
  PROMISE_SUCCESS
} from '../constants'

const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

const persist = createPersist(FAQ_KEY, {
  entities: {},
  meta: null
}, {
  expires: ONE_SECOND
})

const state = persist.get()

const getters = {
  items: state => state.entities
}

const DB_CLASS = 'Faq'
const Faq = db.Object.extend(DB_CLASS)
const faq = new Faq()

const actions = {
  getItems ({ commit }) {
    commit(GET_ITEMS, new db.Query(Faq).find())
  },

  addItem ({ commit }, payload) {
    commit(ADD_ITEM, faq.set(payload).save())
  },

  deleteItem ({ commit }, payload) {
    commit({
      type: DELETE_ITEM,
      payload: db.Object.createWithoutData(DB_CLASS, payload).destroy(),
      // store id for remove
      meta: {
        id: payload
      }
    })
  }
}

const mutations = {
  [GET_ITEMS] (state, { payload, meta }) {
    if (meta) {
      state.meta = meta.promise
      if (meta.promise === PROMISE_SUCCESS && payload) {
        const { entities } = state
        payload.forEach(item => {
          entities[item.id] = item
        })
        state.entities = { ...entities }
        persist.set(state)
      }
    }
  },

  [ADD_ITEM] (state, { payload, meta }) {
    if (meta) {
      state.meta = meta.promise
      if (meta.promise === PROMISE_SUCCESS && payload) {
        const { entities } = state
        entities[payload.id] = payload
        state.entities = { ...entities }
        persist.set(state)
      }
    }
  },

  [DELETE_ITEM] (state, { meta }) {
    if (meta) {
      state.meta = meta.promise
      if (meta.promise === PROMISE_SUCCESS) {
        const { entities } = state
        delete entities[meta.id]
        state.entities = { ...entities }
        persist.set(state)
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
