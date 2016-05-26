import 'whatwg-fetch'
import qs from 'querystring'
import utils from 'vx/utils'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function mutate (url, { headers, body, query, ...options }) {
  headers = { ...defaultHeaders, ...headers }
  options.headers = headers

  const bearer = utils.getAuth()
  if (bearer) {
    headers['Authorization'] = 'Bearer ' + bearer.token
  }

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

  return [url, options]
}

const ajax = (url, options = {}) => {
  utils.setProgress(60)
  return fetch(...mutate(url, options))
  .then(res => {
    if (res.status >= 200 && res.status < 400) {
      return res
    } else {
      throw res
    }
  })
  .then(res => {
    utils.setProgress(100)
    return res.json()
  })
  .catch(err => {
    utils.setProgress(100)
    if (!err.json) {
      utils.addToast({
        code: '500',
        message: 'Server Error'
      })
    } else {
      err.json().then(utils.addToast)
    }
    throw err
  })
}

export default ajax

export const GET = (url, options = {}) => {
  options.method = 'GET'
  return ajax(url, options)
}

export const POST = (url, options = {}) => {
  options.method = 'POST'
  return ajax(url, options)
}

export const PUT = (url, options = {}) => {
  options.method = 'PUT'
  return ajax(url, options)
}

export const PATCH = (url, options = {}) => {
  options.method = 'PATCH'
  return ajax(url, options)
}

export const DELETE = (url, options = {}) => {
  options.method = 'DELETE'
  return ajax(url, options)
}

export const PAGINATE_QUERY = {
  $count: true,
  $offset: 0,
  $limit: 2
}
