import createPersistedState from 'vuex-persistedstate'
import createStorage from 'vuex-localstorage'

/**
 * 数据持久化
 */

export default ({ name, version }, options = {}) => {
  options = { scope: 'persist', ...options }

  const storage = createStorage(`${name}@${version}`, {
    // initial state
  }, {
    // 数据保存一星期
    expires: 7 * 24 * 60 * 60 * 1e3
  })

  // 只注册数据，不注册回调
  return {
    // Vuex 只支持全局 plugins
    plugins: [createPersistedState({
      getState: storage.get,
      setState: storage.set
    })],
    options
  }

  // 另一种实现方式，参见 src/module/config/index.js
}
