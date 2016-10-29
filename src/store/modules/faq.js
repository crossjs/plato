import template from '../template'
import { ONE_MINUTE } from '../constants'

export default template({
  namespace: 'faq',
  source: __DEV__ ? '/api/faq' : '/db/faq.json',
  expires: ONE_MINUTE,
  getters: {
    faq_items: state => state.entities,
    faq_is_fetching: state => state.fetching
  }
})
