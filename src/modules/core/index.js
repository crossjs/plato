import createStore from './create-store'

export default (context, options = {}, register) => {
  // 合并配置项
  options = { scope: 'core', ...options }

  // 注册 store
  // 同时传入配置项
  return [{
    // 为统一标准，将 context 与 options 做为数据传入
    store: createStore(context, options),
    options
  }, ({ router, subscribe }) => {
    let authorized
    router.beforeEach((to, from, next) => {
      if (to.matched.some(m => m.meta.auth) && !authorized) {
        next('/')
      } else {
        next()
      }
    })
    // 监听变化
    subscribe('authorized', value => {
      authorized = value
    })
  }]
}
