import store from 'vx/store'
import { env } from 'vx/getters'
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
  if (toast) {
    if (toast.then) {
      toast.then(_addToast).catch(_addToast)
    } else {
      _addToast(toast)
    }
  }
}

export function getEnv () {
  return env(store.state)
}

function _addToast (toast) {
  toast._id = Date.now()

  store.dispatch(ADD_TOAST, toast)
  setTimeout(() => {
    store.dispatch(DELETE_TOAST, toast)
  }, 3000)
}
