import createLogger from 'vuex/dist/logger'

export default ({ store }) => {
  createLogger()(store)

  return {
    options: { scope: 'logger' }
  }
}
