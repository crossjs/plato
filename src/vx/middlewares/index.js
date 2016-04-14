import createLogger from 'vuex/logger'
import { BEARER_KEY, SET_BEARER } from '../constants'

const localStorageMiddleware = {
  onMutation ({ type, payload }) {
    if (type === SET_BEARER) {
      localStorage.setItem(BEARER_KEY, JSON.stringify(payload[0]))
    }
  }
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStorageMiddleware]
  : [localStorageMiddleware]
