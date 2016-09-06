import createPersist from 'utils/persist'
import { createAction, handleAction, $inject } from 'vuex-actions'
import db from 'store/db'
import normalize from 'utils/normalize'

import {
  ONE_SECOND
} from '../constants'

const FAQ_KEY = 'FAQ_KEY'
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

const persist = createPersist(FAQ_KEY, {
  faq_is_fetching: false,
  entities: {},
  meta: {}
}, {
  expires: ONE_SECOND
})

const state = persist.get()

const getters = {
  faq_items: state => state.entities,
  faq_is_fetching: state => state.faq_is_fetching
}

const DB_CLASS = 'Faq'
const Faq = db.Object.extend(DB_CLASS)
const faq = new Faq()

const actions = {
  getItems: createAction(GET_ITEMS, () =>
    new db.Query(Faq).find()),
  addItem: createAction(ADD_ITEM, payload =>
    faq.set(payload).save()),
  deleteItem: createAction(DELETE_ITEM, payload => ({
    p1: db.Object.createWithoutData(DB_CLASS, payload).destroy(),
    p2: $inject(() => payload)('p1')
  }))
}

const mutations = {
  [GET_ITEMS]: handleAction({
    pending (state) {
      state.faq_is_fetching = true
    },
    success (state, mutation) {
      state.faq_is_fetching = false
      const { entities } = normalize(mutation, {
        value (item) {
          return item.toJSON()
        }
      })
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
      const { entities } = state
      entities[mutation.id] = mutation.toJSON()
      state.entities = { ...entities }
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
    success (state, mutation) {
      state.faq_is_fetching = false
      const { entities } = state
      delete entities[mutation.p2]
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
