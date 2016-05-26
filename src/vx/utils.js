import store from 'vx/store'
import { auth } from 'vx/getters'
import { SET_PROGRESS, ADD_TOAST, DELETE_TOAST } from 'vx/types'

export function setProgress (progress) {
  store.dispatch(SET_PROGRESS, progress)
  if (progress === 100) {
    setTimeout(() => {
      store.dispatch(SET_PROGRESS, 0)
    }, 500)
  }
}

export function addToast (toast) {
  toast._id = Date.now()

  store.dispatch(ADD_TOAST, toast)
  setTimeout(() => {
    store.dispatch(DELETE_TOAST, toast)
  }, 3000)
}

export function getAuth () {
  return auth(store.state)
}

export default {
  setProgress,
  addToast,
  getAuth
}
