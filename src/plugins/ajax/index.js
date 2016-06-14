import 'whatwg-fetch'
import qs from 'querystring'
import Promise from 'nd-promise'

export default function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  if (Vue.config.debug) {
    console.log('[Ajax] Vue Ajax Plugin Installed.')
  }

  const defaultOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  /**
   * $ajax
   * @param  {Object} options   Options
   * @return {Promise}          Request Promise
   */
  Vue.prototype.$ajax = function (_options = {}) {
    const { before = noop, after = noop, ...options } = { ...defaultOptions, ...this.$options.ajax, ..._options }
    before.call(this)
    return mutateOptions(options)
    .then(({ url, ...options }) => fetch(url, options))
    .then(res => {
      if (res.status >= 200 && res.status < 400) {
        return res.json()
      } else {
        throw res
      }
    })
    // .then(res => {
    //   return res.json()
    // })
    // .catch(err => {
    //   throw err
    // })
    .finally(() => {
      after.call(this)
    })
  }

  Vue.prototype.$GET = function (url, options = {}) {
    options.url = url
    options.method = 'GET'
    return this.$ajax(options)
  }

  Vue.prototype.$POST = function (url, options = {}) {
    options.url = url
    options.method = 'POST'
    return this.$ajax(options)
  }

  Vue.prototype.$PUT = function (url, options = {}) {
    options.url = url
    options.method = 'PUT'
    return this.$ajax(options)
  }

  Vue.prototype.$PATCH = function (url, options = {}) {
    options.url = url
    options.method = 'PATCH'
    return this.$ajax(options)
  }

  Vue.prototype.$DELETE = function (url, options = {}) {
    options.url = url
    options.method = 'DELETE'
    return this.$ajax(options)
  }
}

function mutateOptions ({ url, params, body, query, mutate, ...options }) {
  if (body) {
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    options.body = body
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += (url.indexOf('?') !== -1) ? '&' : '?'
    url += query
  }

  // 替换地址中的宏变量：{xyz}
  if (params) {
    // https://github.com/Matt-Esch/string-template
    const nargs = /\{([0-9a-zA-Z_]+)\}/g
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

  // mutate must be a function and return a promise
  if (mutate) {
    return mutate(options)
  }

  return Promise.resolve(options)
}

function noop () {}
