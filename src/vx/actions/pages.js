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
    POST('/apis/pages', {
      body: payload
    })
    .then(json => {
      dispatch(CREATE_PAGE, json)
    })
  },

  deletePage ({ dispatch }, payload) {
    DELETE(`/apis/pages/${payload._id}`)
    .then(json => {
      dispatch(DELETE_PAGE, json)
    })
  }
}
