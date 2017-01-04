import { sync } from 'vuex-router-sync'
import createStore from './create-store'
import createVuexStore from './create-vuex-store'
import createRouter from './create-router'

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
    const { modules, plugins, routes } = context

    // inject store and router
    const store = context.store = createVuexStore(modules, plugins)
    const router = context.router = createRouter(routes)

    // keep vue-router and vuex store in sync.
    sync(store, router)

    // 此处需要优化 getters key 获取方法
    router.beforeEach((to, from, next) => {
      if (to.matched.some(m => m.meta.auth) && !store.getters['core/authorized']) {
        next('/')
      } else {
        next()
      }
    })
  }]
}
