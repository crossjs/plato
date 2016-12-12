import Vue from 'vue'
import flattendeep from 'lodash.flattendeep'

export default (context, options = {}, register) => {
  const { routes } = context

  register({
    store: {
      state: {
        routes
      },
      getters: {
        routes: (state, { authorized }) => state.routes.filter(({ path, meta }) => path !== '/' && (!meta || (!meta.hidden && (meta.auth === undefined || meta.auth === authorized))))
      }
    }
  }, ({ routes, router }) => {
    // 根据原始路径取真实路径
    Vue.prototype.$redirect = function (path, replace) {
      const realPath = match(this.$options.__name, path)
      replace ? router.replace(realPath) : router.push(realPath)
    }

    const flattenRoutes = flattendeep(routes)

    function match (name, path) {
      return flattenRoutes.find(r => r.meta && r.meta.__name === name && r.meta.__path === path) || '/'
    }
  })
}
