import {
  SET_PAGES,
  GET_PAGES,
  DELETE_PAGE
} from '../constants'

import { GET, DELETE } from 'utils/ajax'

export default {
  [SET_PAGES] (state, pages) {
    state.pages = pages
  },

  [GET_PAGES] (state, pages) {
    GET('/apis/pages').then(pages => {
      Promise.all(pages.map(page => {
        // todo: cache users
        return GET(`/apis/users/${page.user}`).then(user => {
          page.username = user.username
        })
      })).then(() => {
        state.pages = pages
      })
    })
  },

  [DELETE_PAGE] (state, page) {
    DELETE(`/apis/pages/${page._id}`).then(pages => {
      state.pages.$remove(page)
    })
  }
}
