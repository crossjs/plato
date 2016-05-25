<template>
  <div class="profile">
    <c-form
      :submit="submit"
      :state="state"
      :title="title"
      :columns="columns"
      :items="profile"
      :actions="actions"></c-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Validator from 'plugins/validator'
import CForm from 'duo/c-form'
import { profile } from 'vx/getters'
import { getProfile, updateProfile } from 'vx/actions'
Vue.use(Validator)
export default {
  data () {
    return {
      state: 0,
      title: '用户信息',
      columns: {
        username: {
          label: '账号',
          type: 'text',
          attrs: {
            // readonly: true
          },
          validate: {
            required: {
              rule: true,
              message: '请输入账号'
            },
            minlength: {
              rule: 4,
              message: '账号不能少于 4 个字符'
            },
            maxlength: {
              rule: 20,
              message: '账号不能多于 20 个字符'
            }
          }
        },
        state: {
          label: '状态',
          type: 'checkbox',
          attrs: {
            'true-label': '正常',
            'false-label': '禁用'
          }
        },
        created: {
          label: '创建时间',
          type: 'datetime',
          attrs: {
            readonly: true
          }
        },
        updated: {
          label: '活跃时间',
          type: 'datetime',
          attrs: {
            readonly: true
          }
        }
      }
    }
  },

  computed: {
    actions () {
      return [
        // 展示态
        {
          modify: {
            type: 'button',
            class: 'primary',
            label: '修改个人资料',
            mutation (ctx) {
              ctx.$parent.state = 1
            }
          }
        },
        // 编辑态
        {
          cancel: {
            type: 'button',
            label: '取消',
            mutation (ctx) {
              ctx.$parent.state = 0
            }
          },
          submit: {
            type: 'submit',
            class: 'warning',
            label: this.progress ? '提交修改中...' : '提交修改',
            disabled: !!this.progress
          }
        }
      ]
    }
  },

  methods: {
    submit ($payload) {
      if (!$payload) {
        this.state = 0
        return
      }
      this.updateProfile($payload)
    }
  },

  watch: {
    profile (val) {
      this.state && this.$nextTick(() => {
        if (val) {
          this.state = 0
        }
      })
    }
  },

  validator: {
    // auto: true
  },

  route: {
    activate () {
      this.getProfile()
    }
  },

  vuex: {
    getters: {
      profile
    },
    actions: {
      getProfile,
      updateProfile
    }
  },

  components: {
    CForm
  }
}
</script>
