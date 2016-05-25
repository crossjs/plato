import * as rules from './rules'

export function install (Vue) {
  if (Vue.config.debug) {
    console.log('Vue Validator Plugin Installed.')
  }

  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init
      ? [validatorInit].concat(options.init)
      : validatorInit
    _init.call(this, options)
  }

  function validatorInit () {
    const { validator } = this.$options

    if (validator) {
      // 在入口处定义 $validation
      Vue.util.defineReactive(this, '$validation', {
        fields: [],
        errors: [],
        valid: true,
        invalid: false
      })
    } else {
      // 寻找父级带 validator 的组件
      const validatorVm = getValidatorVm(this)
      if (validatorVm) {
        // set references
        this.$validation = validatorVm.$validation
        this.$nextTick(function () {
          // 定义了验证规则
          if (this.validate) {
            validatorVm.$validation.fields.push(this)
            // 加载完成自动检查
            if (validatorVm.$options.validator.auto) {
              this.$validate()
            }
          }
        })
      }
    }
  }

  Vue.prototype.$validate = function () {
    const validate = this.validate
    const $validation = this.$validation

    if (validate) { // 带有验证配置的表单控件
      // 重设当前 field 对应的错误信息
      const errors = $validation.errors.filter(error => {
        return error.field !== this.field
      })
      // 验证当前 field
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
      // 更新 $validation
      $validation.errors = errors
      $validation.valid = errors.length === 0
      $validation.invalid = errors.length > 0
    } else if ($validation) { // 带有验证结果对象
      // 验证所有子组件
      $validation.fields.forEach(field => field.$validate())
    }

    return Promise.resolve($validation)
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
