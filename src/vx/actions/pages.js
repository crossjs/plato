import { GET_PAGES, CREATE_PAGE, DELETE_PAGE } from '../constants'
import { GET, POST, DELETE } from 'utils/ajax'

const inject = json =>
  Promise.all(json.map(data => GET(`/apis/users/${data.user}`).then(user => {
    data.username = user.username
  }))).then(() => json)

export default {
  getPages ({ dispatch }, payload) {
    dispatch(GET_PAGES, GET('/apis/pages').then(inject))
  },

  createPage ({ dispatch }, payload) {
    dispatch(CREATE_PAGE, POST('/apis/pages', {
      body: payload
    }))
  },

  deletePage ({ dispatch }, payload) {
    dispatch(DELETE_PAGE, DELETE(`/apis/pages/${payload._id}`))
  }
}
