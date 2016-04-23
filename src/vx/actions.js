import {
  SET_BEARER,

  SET_PROGRESS,

  SET_PROFILE,

  ADD_TOAST,
  DELETE_TOAST,
  CLEAR_TOASTS,

  SET_USERS,

  SET_PAGES
} from './constants'

// bearer token
export const setBearer = makeAction(SET_BEARER)

// global progress
export const setProgress = makeAction(SET_PROGRESS)

// profile
export const setProfile = makeAction(SET_PROFILE)

// toasts
export const addToast = makeAction(ADD_TOAST)
export const deleteToast = makeAction(DELETE_TOAST)
export const clearToasts = makeAction(CLEAR_TOASTS)

// users
export const setUsers = makeAction(SET_USERS)

// pages
export const setPages = makeAction(SET_PAGES)

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
