import template from 'templates/rest'

export default (context, { scope }) => template({
  namespace: scope,
  source: __DEV__ ? '/api/faq' : '/db/faq.json'
})
