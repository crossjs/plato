import Vue from 'vue'

export default (context, options = {}, register) => {
  register({}, ({ routes, router }) => {
    /**
     * Plugins
     */

    // 根据原始路径取真实路径
    Vue.use(Vue => {
      Vue.prototype.$redirect = function (path, replace) {
        const realPath = match(this.$options.__name, path)
        replace ? router.replace(realPath) : router.push(realPath)
      }
    })

    function match (name, path) {
      let realPath = '/'
      // TODO: supporting nested routes
      routes.some(r => {
        if (r.meta && r.meta.__name === name && r.meta.__path === path) {
          realPath = r.path
          return true
        }
      })
      return realPath
    }
  })
}
