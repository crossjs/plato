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
import CForm from 'components/c-form'
import { profile } from 'vx/getters'
import { getProfile, updateProfile } from 'vx/actions'
export default {
  data () {
    return {
      state: 0,
      title: '用户信息',
      columns: {
        username: {
          label: '账号',
          type: 'text'
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
          type: 'datetime'
        },
        updated: {
          label: '活跃时间',
          type: 'datetime'
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
            cls: 'primary',
            label: '修改个人资料',
            mutation (ctx) {
              ctx.$parent.state = 1
            }
          }
        },
        // 编辑态
        {
          cancel: {
            type: 'submit',
            // cls: 'default',
            label: '取消',
            mutation (ctx) {
              ctx.$parent.state = 0
            }
          },
          submit: {
            type: 'submit',
            cls: 'warning',
            label: this.progress ? '提交修改中...' : '提交修改',
            disabled: !!this.progress
          }
        }
      ]
    }
  },

  methods: {
    submit ($validation, $payload) {
      if (!$validation.valid) {
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
