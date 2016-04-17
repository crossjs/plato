import {
  SET_BEARER,

  ADD_TOAST,
  DELETE_TOAST,
  CLEAR_TOAST,

  SET_USERS
} from './constants'

// bearer token
export const setBearer = makeAction(SET_BEARER)

// toasts
export const addToast = makeAction(ADD_TOAST)
export const deleteToast = makeAction(DELETE_TOAST)
export const clearToast = makeAction(CLEAR_TOAST)

// users
export const setUsers = makeAction(SET_USERS)

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
