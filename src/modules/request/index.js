import { configure, intercept } from 'platojs/request'

/**
 * 修改 request 方法的全局配置
 */

export default ({ Vue, store, name, version }, options = {}) => {
  options = { scope: 'request', ...options }

  // 全局，在请求头部加入自定义字段
  configure({
    headers: {
      'Who-Am-I': `${name}@${version}`
    }
  })

  // 如果当前浏览器不支持 CORS，则使用代理
  if (!('withCredentials' in new XMLHttpRequest())) {
    intercept({
      request: [({ req }) => {
        // 如果请求是跨域，则使用本地代理
        // blablabla...
        return { req }
      }]
    })
  }

  return ({ subscribe }) => {
    // 修改全局 Accept-Language
    subscribe('i18n/lang', value => configure({
      headers: {
        'Accept-Language': value
      }
    }))
  }
}
