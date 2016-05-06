import { DELETE_TOAST } from '../types'

export default {
  deleteToast ({ dispatch }, payload) {
    dispatch(DELETE_TOAST, payload)
  }
}
