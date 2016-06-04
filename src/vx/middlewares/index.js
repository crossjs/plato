import createLogger from 'vuex-fsa/logger'
import createPromise from 'vuex-promise'

import {
  PROMISE_PENDING,
  PROMISE_SUCCESS,
  PROMISE_FAILURE
} from '../constants'

const middlewares = [createPromise({
  debug: __DEV__,
  status: {
    PENDING: PROMISE_PENDING,
    SUCCESS: PROMISE_SUCCESS,
    FAILURE: PROMISE_FAILURE
  }
})]

if (__DEV__) {
  middlewares.unshift(createLogger())
}

export default middlewares
