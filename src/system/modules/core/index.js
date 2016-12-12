import { sync } from 'vuex-router-sync'
import createStore from './create-store'
import createRouter from './create-router'

export default (context, options = {}, register) => {
  register({}, () => {
    const { modules, routes } = context

    // inject store and router
    const store = context.store = createStore(modules)
    const router = context.router = createRouter(routes)

    // keep vue-router and vuex store in sync.
    sync(store, router)

    // router hooks
    router.beforeEach((to, from, next) => {
      store.dispatch('setProgress', 80)
      if (to.matched.some(m => m.meta.auth) && !store.getters.authorized) {
        next('/')
      } else {
        next()
      }
    })
    router.afterEach(() => {
      if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
        document.activeElement.blur()
      }
      store.dispatch('setProgress', 100)
    })
  })
}
