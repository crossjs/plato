import 'whatwg-fetch'
import store from 'vx/store'
import { SET_PROGRESS, ADD_TOAST, DELETE_TOAST } from 'vx/constants'
import getBearerToken from 'utils/getBearerToken'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function setProgress (progress) {
  store.dispatch(SET_PROGRESS, progress)
}

function setToast (toast) {
  toast._id = Date.now()

  store.dispatch(ADD_TOAST, toast)
  setTimeout(() => {
    store.dispatch(DELETE_TOAST, toast)
  }, 3000)
}

function mutate (options) {
  options.headers = { ...headers, ...options.headers }

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

const ajax = (url, options = {}) => {
  setProgress(99)
  return fetch(url, mutate(options))
  .then(res => {
    if (res.status >= 200 && res.status < 400) {
      return res
    } else {
      throw res
    }
  })
  .then(res => {
    setProgress(0)
    return res.json()
  })
  .catch(err => {
    setProgress(0)
    if (!err.json) {
      setToast({
        code: '500',
        message: 'Server Error'
      })
    } else {
      err.json().then(setToast)
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
