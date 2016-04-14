import 'whatwg-fetch'
import getBearerToken from 'utils/getBearerToken'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function setHeaders (options) {
  options.headers = { ...defaultHeaders, ...options.headers }

  const bearerToken = getBearerToken()
  if (bearerToken) {
    options.headers['Authorization'] = 'Bearer ' + bearerToken
  }

  return options
}

export default (url, options = {}) => {
  return fetch(url, setHeaders(options))
  .then(res => {
    return res.json()
  })
}
