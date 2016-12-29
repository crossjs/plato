import rnd from 'utils/rnd'
import { ONE_WEEK } from 'utils/constants'
import createPersist from 'vuex-localstorage'

export default ({ scope }) => {
  const SET_PROGRESS = rnd('SET_PROGRESS')
  const ADD_TOAST = rnd('ADD_TOAST')
  const DELETE_TOAST = rnd('DELETE_TOAST')
  const SET_TRANSITION = rnd('SET_TRANSITION')

  const initialState = {
    transition: true, // 默认开启动画效果
    progress: 0,
    toast: null
  }

  const persist = createPersist(scope, initialState, {
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
    setProgress ({ commit }, progress) {
      commit(SET_PROGRESS, progress)
      if (progress === 100) {
        setTimeout(() => {
          commit(SET_PROGRESS, 0)
        }, 500)
      }
    },

    setTransition ({ commit }, payload) {
      commit(SET_TRANSITION, payload)
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
    [SET_PROGRESS] (state, payload) {
      state.progress = payload
    },

    [ADD_TOAST] (state, payload) {
      state.toast = payload
    },
    [SET_TRANSITION]: (state, payload) => {
      state.transition = payload
      persist.set(state)
    },
    [DELETE_TOAST] (state) {
      state.toast = null
    }
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
