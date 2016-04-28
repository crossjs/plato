import { DELETE_TOAST } from '../constants'

export default {
  deleteToast ({ dispatch }, payload) {
    dispatch(DELETE_TOAST, payload)
  }
}
