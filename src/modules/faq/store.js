import template from 'application/store/templates/rest'
import { ONE_MINUTE } from 'application/constants'

export default template({
  namespace: 'faq',
  source: __DEV__ ? '/api/faq' : '/db/faq.json',
  expires: ONE_MINUTE
})
