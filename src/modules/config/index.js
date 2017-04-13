import createStore from './create-store'
import createRoutes from './create-routes'

export default (context, options = {}) => {
  options = { scope: 'config', prefix: 'config', ...options }

  // data, and callback
  return [{
    store: createStore(options),
    routes: createRoutes(options),
    options
  }, ({ store, router, dispatch }) => {
    // 实现进度条、错误提示
    // Vuex 插件的另一种实现方式，参见 src/modules/persist/index.js
    store.subscribe(({ payload }) => {
      if (!payload || !payload.__status__) {
        return
      }

      switch (payload.__status__) {
        case 'pending':
          dispatch('setProgress', 60)
          break
        case 'success':
          dispatch('setProgress', 100)
          break
        case 'error':
          dispatch('setProgress', 100)
          dispatch('addToast', payload.__payload__)
          break
        default:
          // setProgress(0)
      }
    })

    // router hooks
    router.beforeEach((to, from, next) => {
      dispatch('setProgress', 80)
      next()
    })
    router.afterEach(() => {
      dispatch('setProgress', 100)
    })
  }]
}
