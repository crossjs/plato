import template from 'templates/rest'
import { ONE_MINUTE } from 'utils/constants'

export default ({ scope }) => template({
  namespace: scope,
  source: __DEV__ ? '/api/faq' : '/db/faq.json',
  expires: ONE_MINUTE
})
