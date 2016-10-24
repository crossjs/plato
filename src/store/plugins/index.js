import createLogger from 'vuex/dist/logger'

const plugins = [
  store => {
    // 实现进度条、错误提示
    store.subscribe(({ payload }) => {
      if (!payload || !payload.__status__) {
        return
      }
      switch (payload.__status__) {
        case 'pending':
          store.dispatch('setProgress', 60)
          break
        case 'success':
          store.dispatch('setProgress', 100)
          break
        case 'error':
          store.dispatch('setProgress', 100)
          store.dispatch('addToast', payload.__payload__)
          break
        default:
          // setProgress(0)
      }
    })
  }
]

if (__DEV__) {
  plugins.unshift(createLogger())
}

export default plugins
