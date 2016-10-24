const ADD_TOAST = 'ADD_TOAST'
const DELETE_TOAST = 'DELETE_TOAST'

const state = {
  toast: null
}

const getters = {
  toast: state => state.toast
}

let timeoutId

const actions = {
  addToast ({ state, commit }, payload) {
    function doAddToast () {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      commit(ADD_TOAST, payload)
      timeoutId = setTimeout(() => {
        commit(DELETE_TOAST)
      }, 3000)
    }
    if (state.toast) {
      setTimeout(doAddToast, 3000)
    } else {
      doAddToast()
    }
  }
}

const mutations = {
  [ADD_TOAST] (state, payload) {
    state.toast = payload
  },

  [DELETE_TOAST] (state) {
    state.toast = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
