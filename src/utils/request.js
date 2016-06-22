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

/**
 * request
 * @param  {Object} options   Options
 * @return {Promise}          Request Promise
 */
export default function request (_options = {}) {
  const options = merge({}, defaultOptions, _options)
  return new Promise((resolve, reject) => {
    parse(options)
    .then(({ url, ...options }) => fetch(url, options))
    .then(resolve)
    .catch(reject)
  })
  .then(res => {
    if (res.status >= 200 && res.status < 400) {
      return res.json()
    } else {
      if (jsonable(res)) {
        throw res.json()
      }
      // 比如 404、403
      throw new Error(res.statusText)
    }
  }).catch(err => {
    if (err instanceof Error) {
      throw Promise.reject(new RequestError(err.message))
    }
    throw err
  })
}

function jsonable (res) {
  return res.headers.get('Content-Type').indexOf('json') !== -1
}

function parse ({ url, query, params, body, mutate, ...options }) {
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

  // mutate must be a function and return a promise
  // useful for add authorization
  if (mutate) {
    return mutate(options)
  }

  return Promise.resolve(options)
}

function RequestError (message) {
  this.name = 'Request Error'
  this.message = message
  this.stack = (new Error()).stack
}
RequestError.prototype = Object.create(Error.prototype)
RequestError.prototype.constructor = RequestError
