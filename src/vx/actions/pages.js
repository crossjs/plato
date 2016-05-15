import { GET_PAGES, PAGINATE_PAGES, CREATE_PAGE, DELETE_PAGE, UPDATE_PAGE } from '../types'
import { GET, POST, DELETE, PATCH, PAGINATE_QUERY } from 'utils/ajax'

export default {
  getPages ({ dispatch }, { query = PAGINATE_QUERY } = {}) {
    dispatch(PAGINATE_PAGES, { query })
    dispatch(GET_PAGES, GET('/apis/pages', { query }).then(inject))
  },

  createPage ({ dispatch }, payload) {
    dispatch(CREATE_PAGE, POST('/apis/pages', {
      body: payload
    }))
  },

  deletePage ({ dispatch }, payload) {
    dispatch(DELETE_PAGE, DELETE(`/apis/pages/${payload._id}`))
  },

  updatePage ({ dispatch }, { _id, ...payload }) {
    dispatch(UPDATE_PAGE, PATCH(`/apis/pages/${_id}`, {
      body: payload
    }))
  }
}

function inject (pages) {
  return Promise.all(pages.items.map(data => GET(`/apis/users/${data.user}`).then(user => {
    data.username = user.username
  }))).then(() => pages).catch(() => pages)
}
