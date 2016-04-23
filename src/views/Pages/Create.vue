<template>
  <div class="page-create">
    <c-form
      :submit="submit"
      :fields="fields"
      :buttons="buttons">
    </c-form>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import { progress } from 'vx/getters'
export default {
  data () {
    return {
      submit: () => {
        console.log(arguments)
      },
      fields: [{
        label: '页面标题',
        name: 'title',
        type: 'text',
        value: '',
        validate: {
          required: {
            rule: true,
            message: '请输入标题'
          },
          maxlength: {
            rule: 20,
            message: '标题不能多于 20 个字符'
          }
        }
      }, {
        label: '页面内容',
        name: 'content',
        type: 'multiline',
        value: '',
        validate: {
          required: {
            rule: true,
            message: '请输入内容'
          },
          maxlength: {
            rule: 2000,
            message: '内容不能多于 2000 个字符'
          }
        }
      }],
      buttons: [{
        role: 'submit',
        type: 'submit',
        // string or function
        label: $validation => {
          return this.progress ? '提交创建中...' : '提交创建'
        },
        // boolean or function
        disabled: $validation => {
          return !$validation.valid || !!this.progress
        }
      }]
    }
  },

  vuex: {
    getters: {
      progress
    }
  },

  components: {
    CForm
  }
}
</script>
