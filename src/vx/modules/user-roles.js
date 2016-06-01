import {
  GET_USER_ROLES,
  DELETE_USER_ROLE,
  CREATE_USER_ROLE
} from '../types'

import {
  PROMISE_SUCCESS
} from '../constants'

const state = {
  'user-roles': {}
}

const mutations = {
  [GET_USER_ROLES] (state, { payload, meta }) {
    if (meta === PROMISE_SUCCESS) {
      if (payload.length) {
        state['user-roles'][payload[0].username] = payload
      }
    }
  },

  [CREATE_USER_ROLE] (state, { payload: { username, name }, meta }) {
    if (meta === PROMISE_SUCCESS) {
      let arr = state['user-roles'][username]
      if (!arr) {
        arr = state['user-roles'][username] = []
      }
      arr.push({ name })
    }
  },

  [DELETE_USER_ROLE] (state, { payload: { username, name }, meta }) {
    if (meta === PROMISE_SUCCESS) {
      const arr = state['user-roles'][username]
      arr.some((role, index) => {
        if (role.name === name) {
          arr.splice(index, 1)
          return true
        }
      })
      if (!arr.length) {
        state['user-roles'][username] = null
      }
    }
  }
}

export default {
  state,
  mutations
}
