import * as rules from './rules'

export function install (Vue) {
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
    if (validator) {
      Vue.util.defineReactive(this, '$validation', {
        errors: [],
        valid: true,
        invalid: false
      })
    } else {
      const validatorVm = getValidatorVm(this)
      if (validatorVm) {
        this.$validation = validatorVm.$validation
      }
    }
  }

  Vue.prototype.$validate = function () {
    const validate = this.validate
    if (!validate) {
      return
    }
    const { $validation } = getValidatorVm(this)
    // reset field errors
    const errors = $validation.errors.filter(error => {
      return error.field !== this.field
    })
    // validate field with rules
    Object.keys(validate).some(key => {
      if (rules.hasOwnProperty(key)) {
        const { rule, message } = validate[key]
        if (!rules[key](this.value, rule)) {
          errors.push({
            field: this.field,
            rule,
            message
          })
          return true
        }
      }
      return false
    })
    $validation.errors = errors
    $validation.valid = errors.length === 0
    $validation.invalid = errors.length > 0
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
