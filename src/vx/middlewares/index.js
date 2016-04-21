import createLogger from 'vuex/logger'
import { BEARER_KEY, SET_BEARER } from '../constants'

const localStorageMiddleware = {
  onMutation ({ type, payload }) {
    if (type === SET_BEARER) {
      localStorage.setItem(BEARER_KEY, JSON.stringify(payload[0]))
    }
  }
}

const { NODE_ENV } = process.env

export default NODE_ENV !== 'production' && NODE_ENV !== 'test'
  ? [createLogger(), localStorageMiddleware]
  : [localStorageMiddleware]
