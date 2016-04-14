import 'whatwg-fetch'
import getBearerToken from 'utils/getBearerToken'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function modify (options) {
  options.headers = { ...defaultHeaders, ...options.headers }

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

export default (url, options = {}) => {
  return fetch(url, modify(options))
  .then(res => {
    return res.json()
  })
}
