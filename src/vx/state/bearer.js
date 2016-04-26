import {
  BEARER_KEY
} from '../constants'

export default {
  bearer: (function () {
    try {
      return JSON.parse(localStorage.getItem(BEARER_KEY) || '[]')
    } catch (e) {
      // log e
      return []
    }
  })()
}
