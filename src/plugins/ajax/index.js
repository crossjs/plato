import 'whatwg-fetch'
import qs from 'querystring'
import Promise from 'nd-promise'

export default function plugin (Vue, options = {}) {
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

  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  merge(defaultOptions, options)

  function ajaxInit () {
    const { ajax } = this.$options

    if (ajax) {
      const defaults = {}
      merge(defaults, defaultOptions)
      // 未声明为根，则会自动继承父级的配置
      if (!ajax.root && this.$parent) {
        merge(defaults, this.$parent.$options.ajax)
      }
      merge(defaults, ajax)
      this.$options.ajax = defaults
    }
  }

  /**
   * $ajax
   * @param  {Object} options   Options
   * @return {Promise}          Request Promise
   */
  Vue.prototype.$ajax = function (_options = {}) {
    const { hooks = {}, ...options } = { ...this.$options.ajax, ..._options }
    hook.call(this, hooks.before)
    return parse(options)
    .then(({ url, ...options }) => fetch(url, options))
    .then(res => {
      if (res.status >= 200 && res.status < 400) {
        hook.call(this, hooks.success, res)
        // 总是返回 JSON
        return res.json()
      } else {
        // 比如 404
        if (res.headers.get('Content-Type').indexOf('json') === -1) {
          throw new RequestError(res.statusText)
        }
        throw res
      }
    })
    .catch(err => {
      hook.call(this, hooks.failure, err)
      throw err
    })
    .finally(() => {
      hook.call(this, hooks.after)
    })
  }

  Vue.prototype.$GET = function (options = {}) {
    return convert.call(this, options, 'GET')
  }

  Vue.prototype.$POST = function (options = {}) {
    return convert.call(this, options, 'POST')
  }

  Vue.prototype.$PUT = function (options = {}) {
    return convert.call(this, options, 'PUT')
  }

  Vue.prototype.$PATCH = function (options = {}) {
    return convert.call(this, options, 'PATCH')
  }

  Vue.prototype.$DELETE = function (options = {}) {
    return convert.call(this, options, 'DELETE')
  }
}

function parse ({ url, query, params, body, mutate, ...options }) {
  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += (url.indexOf('?') !== -1) ? '&' : '?'
    url += query
  }

  // 替换地址中的宏变量：{xyz}
  if (params) {
    // from: https://github.com/Matt-Esch/string-template
    const nargs = /\{(\w+)\}/g
    url = url.replace(nargs, function replaceArg (match, i, index) {
      let result

      if (url[index - 1] === '{' &&
        url[index + match.length] === '}') {
        return i
      } else {
        result = params.hasOwnProperty(i) ? params[i] : null
        if (result === null || result === undefined) {
          return ''
        }

        return result
      }
    })
  }

  options.url = url

  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    options.body = body
  }

  // mutate must be a function and return a promise
  // useful for add authorization
  if (mutate) {
    return mutate(options)
  }

  return Promise.resolve(options)
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

function hook (fn, ...args) {
  if (fn) {
    fn.apply(this, args)
  }
}

function merge (src, obj) {
  Object.keys(obj).forEach(key => {
    if (!src.hasOwnProperty(key)) {
      src[key] = {}
    }

    Object.assign(src[key], obj[key])
  })
}

function RequestError (message) {
  this.name = 'RequestError'
  this.message = message
  this.stack = (new Error()).stack
}
RequestError.prototype = Object.create(Error.prototype)
RequestError.prototype.constructor = RequestError
