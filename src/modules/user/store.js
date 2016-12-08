import createPersist from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'utils/constants'
import rnd from 'utils/rnd'

const SET_TRANSITION = rnd('SET_TRANSITION')
const SET_PROGRESS = rnd('SET_PROGRESS')
const ADD_TOAST = rnd('ADD_TOAST')
const DELETE_TOAST = rnd('DELETE_TOAST')

const persist = createPersist('core', {
  transition: true, // 默认开启动画效果
  progress: 0,
  toast: null
}, {
  expires: ONE_WEEK
})

const state = persist.get()

const getters = {
  transition: state => state.transition,
  progress: state => state.progress,
  toast: state => state.toast
}

let timeoutId

const actions = {
  setTransition: createAction(SET_TRANSITION),

  setProgress ({ commit }, progress) {
    commit(SET_PROGRESS, progress)
    if (progress === 100) {
      setTimeout(() => {
        commit(SET_PROGRESS, 0)
      }, 500)
    }
  },

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
  [SET_TRANSITION]: handleAction((state, transition) => {
    state.transition = transition
    // always set progress and toast as initial state
    persist.set({ transition })
  }),

  [SET_PROGRESS] (state, payload) {
    state.progress = payload
  },

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
