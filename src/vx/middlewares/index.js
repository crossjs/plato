import createLogger from 'vuex-fsa/logger'
import createPromise from 'vuex-promise'

import {
  PROMISE_PENDING,
  PROMISE_SUCCESS,
  PROMISE_FAILURE
} from '../constants'

const middlewares = [createPromise({
  debug: process.env.NODE_ENV === 'development',
  status: {
    PENDING: PROMISE_PENDING,
    SUCCESS: PROMISE_SUCCESS,
    FAILURE: PROMISE_FAILURE
  }
})]

if (process.env.NODE_ENV === 'development') {
  middlewares.unshift(createLogger())
}

export default middlewares
