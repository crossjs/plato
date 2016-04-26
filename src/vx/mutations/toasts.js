import {
  ADD_TOAST,
  SHIFT_TOAST,
  DELETE_TOAST,
  CLEAR_TOASTS
} from '../constants'

export default {
  [ADD_TOAST] (state, toast) {
    state.toasts.push(toast)
  },

  [DELETE_TOAST] (state, toast) {
    state.toasts.$remove(toast)
  },

  [CLEAR_TOASTS] (state) {
    state.toasts = []
  },

  [SHIFT_TOAST] (state) {
    if (state.toasts.length) {
      state.toasts.shift()
    }
  }
}
