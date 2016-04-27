import {
  GET_PAGES,
  CREATE_PAGE,
  DELETE_PAGE
} from '../constants'

const state = {
  pages: []
}

const mutations = {

  [GET_PAGES] (state, pages, status) {
    if (status === 1) {
      state.pages = pages
    }
  },

  [CREATE_PAGE] (state, page) {
    state.pages.push(page)
  },

  [DELETE_PAGE] (state, page) {
    state.pages.some((p, i) => {
      if (p._id === page._id) {
        state.pages.splice(i, 1)
        return true
      }
    })
  }

}

export default {
  state,
  mutations
}
