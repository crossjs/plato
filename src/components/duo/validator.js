import * as rules from './rules'

export function install (Vue) {
  // // 1. 添加全局方法或属性
  // Vue.myGlobalMethod = ...
  // // 2. 添加全局资源
  // Vue.directive('my-directive', {})
  // // 3. 添加实例方法
  // Vue.prototype.$myMethod = ...

  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [validatorInit].concat(options.init)
      : validatorInit
    _init.call(this, options)
  }

  function validatorInit () {
    const options = this.$options
    const { validator } = options
    // validator option handling
    const validatorVm = getValidatorVm(this)
    if (validatorVm) {
      this.$validation = validatorVm.$validation
    }
    if (validator) {
      Vue.util.defineReactive(this, '$validation', {
        errors: []
      })
      // console.log('this.$validation', this.$validation)
      // store injection
      // if (store) {
      //   this.$store = store
      // } else if (options.parent && options.parent.$store) {
      //   this.$store = options.parent.$store
      // }
    }
  }

  Vue.prototype.$validate = function () {
    const validate = this.validate
    if (!validate) {
      return
    }
    const { $validation } = getValidatorVm(this)
    const errors = $validation.errors.filter(error => {
      return error.field !== this.field
    })
    Object.keys(validate).some(key => {
      if (rules.hasOwnProperty(key)) {
        const { rule, message } = validate[key]
        if (!rules[key](this.value, rule)) {
          errors.push({
            field: this.field,
            message
          })
          return true
        }
      }
      return false
    })
    $validation.errors = errors
  }
}

function getValidatorVm (vm) {
  while ((vm = vm.$parent)) {
    if (vm.$options.validator) {
      return vm
    }
  }
}

export default {
  install
}
