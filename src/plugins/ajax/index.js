import request, { merge } from 'utils/request'

export default function plugin (Vue, globalOptions = {}) {
  if (plugin.installed) {
    return
  }

  if (Vue.config.debug) {
    console.log('[Ajax] Vue Ajax Plugin Installed.')
  }

  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [ajaxInit].concat(options.init)
      : ajaxInit
    _init.call(this, options)
  }

  function ajaxInit () {
    const { ajax } = this.$options

    if (ajax) {
      let parentOptions
      if (!ajax.root && this.$parent) {
        parentOptions = this.$parent.$options.ajax
      }
      // 全局 -> 父级 -> self
      this.$options.ajax = merge({}, globalOptions, parentOptions || {}, ajax)
    }
  }

  function convert (options, method) {
    if (typeof options === 'string') {
      options = {
        url: options
      }
    }
    options.method = method
    return this.$ajax(options)
  }

  /**
   * $ajax
   * @param  {Object} options   Options
   * @return {Promise}          Request Promise
   */
  Vue.prototype.$ajax = function (options = {}) {
    return request(merge({}, this.$options.ajax, options))
  }

  Vue.prototype.$GET = function (...args) {
    return convert.apply(this, args.concat('GET'))
  }

  Vue.prototype.$POST = function (...args) {
    return convert.apply(this, args.concat('POST'))
  }

  Vue.prototype.$PUT = function (...args) {
    return convert.apply(this, args.concat('PUT'))
  }

  Vue.prototype.$PATCH = function (...args) {
    return convert.apply(this, args.concat('PATCH'))
  }

  Vue.prototype.$DELETE = function (...args) {
    return convert.apply(this, args.concat('DELETE'))
  }
}
