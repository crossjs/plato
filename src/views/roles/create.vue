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
import form from 'mixins/form'
import { POST } from 'utils/ajax'
export default {
  mixins: [form],

  data () {
    return {
      submit: this.create,
      fields: [{
        label: '角色名称',
        name: 'name',
        type: 'text',
        value: '',
        validate: {
          required: {
            rule: true,
            message: '请输入角色名称'
          },
          maxlength: {
            rule: 20,
            message: '角色名称不能多于 20 个字符'
          }
        }
      }, {
        label: '角色描述',
        name: 'desc',
        type: 'multiline',
        value: '',
        validate: {
          required: {
            rule: true,
            message: '请输入角色描述'
          },
          maxlength: {
            rule: 100,
            message: '角色描述不能多于 100 个字符'
          }
        }
      }, {
        label: '角色等级',
        name: 'level',
        type: 'select',
        options: [8, 4, 2, 1, 0].map(key => {
          return {
            text: key,
            value: key
          }
        }),
        value: 4,
        validate: {
          required: {
            rule: true,
            message: '请输入角色等级'
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

  methods: {
    create ($validation) {
      if (!$validation.valid) {
        return
      }
      POST('/apis/roles', {
        body: this.formdata()
      })
      .then(json => {
        this.$route.router.go('/roles')
      })
    }
  }
}
</script>
