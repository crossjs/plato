import { intercept } from 'platojs/util/request'

/**
 * 修改 request 方法的全局配置
 */

export default ({ name, version }, options = {}) => {
  options = { scope: 'request', ...options }

  // 直接修改，不需要注册，不需要在回调时再修改
  intercept({
    // 修改请求体，可以用于添加 Dispatcher、Proxy 等
    // 比如，对于 IE8/9，可以将 PUT/PATCH 请求修改为 POST 请求
    request: [({ req }) => {
      // 在请求头部加入自定义字段
      // 可以用于添加 Authorization 等
      req.headers['Who-Am-I'] = `${name}@${version}`
      return { req }
    }]
  })

  // 不返回任何值
}
