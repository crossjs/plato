import createStore from './create-store'
import createRoutes from './create-routes'

export default (context, options = {}) => {
  options = { scope: 'config', prefix: 'config', ...options }

  // data, and callback
  return [{
    store: createStore(options),
    routes: createRoutes(options),
    options
  }, ({ store, router }) => {
    // 实现进度条、错误提示
    // Vuex 插件的另一种实现方式，参见 src/modules/persist/index.js
    store.subscribe(({ payload }) => {
      if (!payload || !payload.__status__) {
        return
      }
      // 此处需要优化 action type 获取方法
      switch (payload.__status__) {
        case 'pending':
          store.dispatch(`${options.scope}/setProgress`, 60)
          break
        case 'success':
          store.dispatch(`${options.scope}/setProgress`, 100)
          break
        case 'error':
          store.dispatch(`${options.scope}/setProgress`, 100)
          store.dispatch(`${options.scope}/addToast`, payload.__payload__)
          break
        default:
          // setProgress(0)
      }
    })

    // router hooks
    // 此处需要优化 action type 获取方法
    router.beforeEach((to, from, next) => {
      store.dispatch(`${options.scope}/setProgress`, 80)
      next()
    })
    router.afterEach(() => {
      store.dispatch(`${options.scope}/setProgress`, 100)
    })
  }]
}
