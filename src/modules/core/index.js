import Vue from 'vue'
import flattendeep from 'lodash.flattendeep'
import { sync } from 'vuex-router-sync'
import createStore from './create-store'
import createVuexStore from './create-vuex-store'
import createRouter from './create-router'

export default (context, options = {}, register) => {
  register({
    store: createStore(context, options)
  }, () => {
    const { modules, routes } = context

    // inject store and router
    const store = context.store = createVuexStore(modules)
    const router = context.router = createRouter(routes)

    // keep vue-router and vuex store in sync.
    sync(store, router)

    /**
     * redirect to correct path
     * 根据原始路径取真实路径
     */
    Vue.prototype.$redirect = function (path, replace) {
      const realPath = matchRoute(this.$options.__scope, path)
      replace ? router.replace(realPath) : router.push(realPath)
    }

    const flattenRoutes = flattendeep(routes)

    function matchRoute (scope, path) {
      return flattenRoutes.find(r => r.meta && r.meta.__scope === scope && r.meta.__path === path) || '/'
    }
  })
}
