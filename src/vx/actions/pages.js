import { GET_PAGES, CREATE_PAGE, DELETE_PAGE } from '../constants'
import { GET, POST, DELETE } from 'utils/ajax'

export default {
  getPages ({ dispatch }, payload) {
    GET('/apis/pages')
    .then(json => {
      Promise.all(json.map(data => {
        // todo: cache users
        return GET(`/apis/users/${data.user}`).then(user => {
          data.username = user.username
        })
      })).then(() => {
        dispatch(GET_PAGES, json)
      })
    })
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
