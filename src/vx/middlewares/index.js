import createLogger from 'vuex/logger'
import createPromise from 'vuex-promise'

const middlewares = [createPromise({
  debug: true
})]

if (process.env.NODE_ENV === 'development') {
  middlewares.unshift(createLogger())
}

export default middlewares
