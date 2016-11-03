import template from '../template'
import { ONE_MINUTE } from '../constants'

export default template({
  namespace: 'faq',
  source: __DEV__ ? '/api/faq' : '/db/faq.json',
  expires: ONE_MINUTE,
  memcache: ONE_MINUTE / 6, // cache for ten seconds
  getters: {
    faq_items: state => state.entities,
    faq_is_fetching: state => state.fetching
  }
})
