import createPersist from 'vuex-localstorage'

/**
 * 数据持久化
 */

export default ({ name, version }, options = {}) => {
  options = { scope: 'persist', ...options }

  // 只注册数据，不注册回调
  return {
    // Vuex 只支持全局 plugins
    plugins: [createPersist({
      // 使用 name 与 version 做 key
      // 避免可能的新旧版本间的数据冲突
      namespace: `${name}@${version}`,
      expires: 7 * 24 * 60 * 60 * 1e3
    })],
    options
  }

  // Vuex 插件的另一种实现方式，参见 src/module/config/index.js
}
