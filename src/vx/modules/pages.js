import {
  GET_PAGES,
  PAGINATE_PAGES,
  CREATE_PAGE,
  DELETE_PAGE,
  UPDATE_PAGE
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  pages: {
    // disable pagination
    count: 0,
    items: [],
    query: {}
  }
}

const mutations = {
  [GET_PAGES] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      Object.assign(state.pages, payload)
    }
  },

  [PAGINATE_PAGES] (state, { payload }) {
    Object.assign(state.pages, payload)
  },

  [CREATE_PAGE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      state.pages.count += 1
      state.pages.items.push(payload)
    }
  },

  [DELETE_PAGE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state.pages
      items.some((user, index) => {
        if (user._id === payload._id) {
          items.splice(index, 1)
          state.pages.count -= 1
          return true
        }
      })
    }
  },

  [UPDATE_PAGE] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const { items } = state.pages
      items.some((user, index) => {
        if (user._id === payload._id) {
          items.$set(index, { ...user, ...payload })
          return true
        }
      })
    }
  }

}

export default {
  state,
  mutations
}
