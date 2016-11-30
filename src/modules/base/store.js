import createPersist, { rnd } from 'vuex-localstorage'
import { createAction, handleAction } from 'vuex-actions'
import { ONE_WEEK } from 'application/constants'
import request from 'application/utils/request'

const SET_ENV = rnd()
const SET_PROGRESS = rnd()
const ADD_TOAST = rnd()
const DELETE_TOAST = rnd()

const persist = createPersist('core', {
  lang: navigator.language.split('-')[0],
  i18n: null,
  transition: true, // 默认开启动画效果
  authorized: false,
  progress: 0,
  toast: null
}, {
  expires: ONE_WEEK
})

const state = persist.get()

const getters = {
  lang: state => state.lang,
  i18n: state => state.i18n,
  transition: state => state.transition,
  authorized: state => state.authorized,
  progress: state => state.progress,
  toast: state => state.toast
}

let timeoutId

const actions = {
  setEnv: createAction(SET_ENV, payload => {
    if (payload.lang) {
      return request({
        url: `./i18n/${payload.lang}.json`
      }).then(i18n => ({ ...payload, i18n }))
    }
    return payload
  }),

  // setProgress: createAction(SET_PROGRESS, payload => {
  //   if (payload === 100) {
  //     return {
  //       payload,
  //       _: new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve(0)
  //         }, 500)
  //       })
  //     }
  //   } else {
  //     return payload
  //   }
  // }),

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
  [SET_ENV]: handleAction((state, mutation) => {
    Object.assign(state, mutation)
    // always set progress and toast as initial state
    persist.set({ ...state, progress: 0, toast: null })
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
