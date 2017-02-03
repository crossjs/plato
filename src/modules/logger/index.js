import createLogger from 'vuex/dist/logger'

export default ({ store }, options = {}) => {
  createLogger()(store)

  return {
    options: { scope: 'logger' }
  }
}
