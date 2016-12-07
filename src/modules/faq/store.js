import template from 'templates/rest'
import { ONE_MINUTE } from 'utils/constants'

export default template({
  namespace: 'faq',
  source: __DEV__ ? '/api/faq' : '/db/faq.json',
  expires: ONE_MINUTE
})
