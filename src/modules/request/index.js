import { configure } from 'util/request'

/**
 * 修改 request 方法的全局配置
 */

export default ({ name, version }, options = {}) => {
  options = { scope: 'request', ...options }

  // 直接修改，不需要注册，不需要在回调时再修改
  configure({
    // configure 除了 mutator 还支持其它参数
    // 其中 mutator 特殊处理，多次添加则会多次执行，
    // 其它参数直接 cheap-merge 到默认参数
    mutator (options) {
      // 在请求头部加入自定义字段
      // 可以用于添加 Authorization 等
      options.headers['Who-Am-I'] = `${name}@${version}`
      return options
    }
  })

  // 只注册回调，不注册数据
  // return ({ name, version }) => {
  //   configure({
  //     mutator (options) {
  //       options.headers['Who-Am-I'] = `${name}@${version}`
  //       return options
  //     }
  //   })
  // }
}
