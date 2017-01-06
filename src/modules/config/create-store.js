import uniqueId from 'lodash/uniqueId'

export default ({ scope }) => {
  const SET_PROGRESS = uniqueId('SET_PROGRESS')
  const ADD_TOAST = uniqueId('ADD_TOAST')
  const DELETE_TOAST = uniqueId('DELETE_TOAST')
  const SET_TRANSITION = uniqueId('SET_TRANSITION')

  const state = {
    transition: true, // 默认开启动画效果
    progress: 0,
    toast: null
  }

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
