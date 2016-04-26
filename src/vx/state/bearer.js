import {
  _BEARER_KEY
} from '../constants'

export default {
  bearer: (function () {
    try {
      return JSON.parse(localStorage.getItem(_BEARER_KEY) || '[]')
    } catch (e) {
      // log e
      return []
    }
  })()
}
