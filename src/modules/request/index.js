import { configure, intercept } from 'platojs/util/request'

// 判断是否小于等于 IE9，请自行实现
const isLEIE9 = false

/**
 * 修改 request 方法的全局配置
 */

export default ({ Vue, store, name, version }, options = {}) => {
  // options = { scope: 'request', ...options }

  // 修改全局
  configure({
    headers: {
      // 在请求头部加入自定义字段
      'Who-Am-I': `${name}@${version}`
    }
  })

  intercept({
    // 修改本次请求
    request: [({ req }) => {
      const { method } = req
      if (method === 'PUT') {
        // IE9 以下特殊处理
        // 此处仅为举例
        if (isLEIE9) {
          req.method = 'POST'
          req.headers['Real-Method'] = 'PUT'
        }
      }
      req.headers['Who-Am-I'] = `${name}@${version}`
      return { req }
    }]
  })

  return () => {
    // 修改 Accept-Language
    // TODO 此处的实现略显繁琐，需要优化
    new Vue({
      store,
      mapGetters: ['i18n/lang'],
      watch: {
        lang (val) {
          this.configure(val)
        }
      },
      created () {
        this.configure(this.lang)
      },
      methods: {
        configure (val) {
          configure({
            headers: {
              'Accept-Language': val
            }
          })
        }
      }
    })
  }
}
