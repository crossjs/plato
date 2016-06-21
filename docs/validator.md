# 使用 validator

简单的表单校验实现

*可以校验非表单：直接校验 value 值，详情参见单元测试用例*

## 文件

- `plugins/validator`

## 用法

在 index.js 引入 Validator 插件

``` js
import Vue from 'vue'
import Validator from 'plugins/validator'

// 使用插件
Vue.use(Validator)
```

在组件中设置 validator 资源

``` vue
<template>
  <!-- 表单项的值变化自动触发校验 -->
  <c-form ...></c-form>
  <!-- 使用校验结果 -->
  <c-validation
    :validation="$validation"></c-validation>
</template>

<script>
import CForm from 'components/c-form'
import CValidation from 'components/c-validation'
export default {
  ...
  validator: {
    // 初始化后自动检查
    auto: true
  },
  ...
  methods: {
    submit () {
      // 手动执行校验，返回 Promise 对象
      this.$validate().then(() => {
        // success
      }).catch($validation => {
        // failure
      })
    }
  },
  components: {
    CForm,
    CValidation
  }
}
</script>
```
