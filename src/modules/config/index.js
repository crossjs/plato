import createStore from './create-store'
import createRoutes from './create-routes'

export default (context, options = {}, register) => {
  options = { scope: 'config', prefix: '/', ...options }

  register({
    store: createStore(options),
    routes: createRoutes(options),
    ...options
  }, ({ store, router }) => {
    // store plugin
    // 实现进度条、错误提示
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
  })
}
