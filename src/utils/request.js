import 'whatwg-fetch'
import Promise from 'nd-promise'
import qs from 'querystring'
import isPlainObj from 'is-plain-obj'

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'GET'
}

/**
 * request
 * @param  {Object} options   Options
 * @return {Promise}          Request Promise
 */
export default function request (_options = {}) {
  const options = merge({}, defaultOptions, _options)
  return new Promise((resolve, reject) => {
    parseOptions(options)
    .then(({ url, ...options }) => fetch(url, options))
    .then(res => {
      if (res.status >= 200 && res.status < 400) {
        res.json().then(resolve, reject)
      } else {
        if (jsonable(res)) {
          res.json().then(reject)
        } else {
          // 比如 404、403
          reject(new RequestError(res.statusText))
        }
      }
    })
    .catch(err => {
      reject(new RequestError(err.message))
    })
  })
}

export function merge (src, ...args) {
  args.forEach(arg => {
    Object.keys(arg).forEach(key => {
      if (isPlainObj(arg[key])) {
        if (!src.hasOwnProperty(key)) {
          src[key] = {}
        }
        Object.assign(src[key], arg[key])
      } else {
        src[key] = arg[key]
      }
    })
  })
  return src
}

function jsonable (res) {
  const type = res.headers.get('Content-Type')
  return type && type.indexOf('json') !== -1
}

function parseOptions ({ url = '', query, params, body, mutate, ...options }) {
  if (body) {
    if (typeof body === 'object') {
      if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
        body = JSON.stringify(body)
      } else {
        url += ((url.indexOf('?') !== -1) ? '&' : '?') + qs.stringify(body)
        body = null
      }
    }
    if (body) {
      options.body = body
    }
  }

  if (query) {
    if (typeof query === 'object') {
      query = qs.stringify(query)
    }
    url += ((url.indexOf('?') !== -1) ? '&' : '?') + query
  }

  // 替换地址中的宏变量：{xyz}
  if (params) {
    url = replaceUrlWithParams(url, params)
  }

  options.url = url

  // mutate must be a function and return a promise
  // useful for add authorization
  if (mutate) {
    return mutate(options)
  }

  return Promise.resolve(options)
}

function replaceUrlWithParams (url, params) {
  // from: https://github.com/Matt-Esch/string-template
  return url.replace(/\{(\w+)\}/g, function (match, key, index) {
    let result

    // {{x}} -> {x}
    if (url.charAt(index - 1) === '{' &&
      url.charAt(index + match.length) === '}') {
      return key
    } else {
      // {x} -> *
      result = params.hasOwnProperty(key) ? params[key] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}

function RequestError (message) {
  this.name = 'Request Error'
  this.message = message
  this.stack = (new Error()).stack
}
RequestError.prototype = Object.create(Error.prototype)
RequestError.prototype.constructor = RequestError
