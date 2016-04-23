import 'whatwg-fetch'
import store from 'vx/store'
import {
  SET_PROGRESS,
  ADD_TOAST
} from 'vx/constants'
import getBearerToken from 'utils/getBearerToken'

const defaults = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function mutate (options) {
  options.headers = { ...defaults, ...options.headers }

  const bearerToken = getBearerToken()
  if (bearerToken) {
    options.headers['Authorization'] = 'Bearer ' + bearerToken
  }

  if (options.body) {
    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }
  }

  return options
}

function inject (json) {
  json._id = Date.now()
  return json
}

const ajax = (url, options = {}) => {
  store.dispatch(SET_PROGRESS, 99)
  return fetch(url, mutate(options))
  .then(res => {
    store.dispatch(SET_PROGRESS, 0)
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      // global toast
      res.json().then(inject).then(json => store.dispatch(ADD_TOAST, json))
      throw res
    }
  })
  .then(res => {
    return res.json()
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
