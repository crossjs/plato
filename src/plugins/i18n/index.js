import format from 'string-template'

export function install (Vue) {
  if (Vue.config.debug) {
    console.log('Vue I18n Plugin Installed.')
  }

  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [i18nInit].concat(options.init)
      : i18nInit
    _init.call(this, options)
  }

  function i18nInit () {
    const { i18n } = this.$options

    if (i18n) {
      // 在入口处定义 $i18n
      Vue.util.defineReactive(this, '$i18n', Object.assign({
        languages: [],
        resources: {}
      }, i18n))
    } else {
      // 寻找父级带 i18n 的组件
      const i18nVm = getI18nVm(this)
      if (i18nVm) {
        // set references
        this.$i18n = i18nVm.$i18n
      }
    }
  }

  Vue.prototype.__ = Vue.prototype.$translate = function (key, ...args) {
    if (!key) {
      return ''
    }
    // `.` 作为分隔符
    return format(key.split('.').reduce((res, key) => {
      if (res.hasOwnProperty(key)) {
        return res[key]
      }
      return {}
    }, this.$i18n.resources), ...args)
  }
}

function getI18nVm (vm) {
  while ((vm = vm.$parent)) {
    if (vm.$options.i18n) {
      return vm
    }
  }
}

export default {
  install
}
