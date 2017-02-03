import createStore from './create-store'

export default (context, options = {}, register) => {
  // 合并配置项
  options = { scope: 'core', prefix: '/', ...options }

  // 注册 store
  // 同时传入配置项
  return [{
    // 为统一标准，将 context 与 options 做为数据传入
    store: createStore(context, options),
    options
  }, context => {
    // 模块注册完成后的回调
    const { store, router } = context

    // 此处需要优化 getters key 获取方法
    router.beforeEach((to, from, next) => {
      if (to.matched.some(m => m.meta.auth) && !store.getters[`${options.scope}/authorized`]) {
        next('/')
      } else {
        next()
      }
    })
  }]
}
