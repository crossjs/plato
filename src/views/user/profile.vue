<template>
  <div class="v-user-profile">
    <c-pane>
      <c-group
        :title="title"
        :cells="cells"></c-group>
    </c-pane>
    <c-pane>
      <c-button class="primary" @click="go('user/modify')">修改资料</c-button>
    </c-pane>
    <c-pane>
      <c-button class="warning" @click="go('logout')">退出登录</c-button>
    </c-pane>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import CPane from 'components/c-pane'
import CGroup from 'components/c-group'
import CButton from 'components/c-button'
import { profile } from 'vx/getters'
import { getProfile } from 'vx/actions'
export default {
  data () {
    return {
      title: '个人资料'
    }
  },

  computed: {
    cells () {
      const {
        username, state, signature,
        gender, birthday, address,
        created, updated, expires
      } = this.profile
      return [{
        label: '账号',
        value: username
      }, {
        label: '状态',
        value: ['禁用', '正常'][state]
      }, {
        label: '签名',
        value: signature
      }, {
        label: '性别',
        value: ['-', '男', '女', '其它'][gender + 1]
      }, {
        label: '出生年月',
        value: birthday || '-'
      }, {
        label: '联系地址',
        value: address || '-'
      }, {
        label: '创建时间',
        value: datetime(created)
      }, {
        label: '更新时间',
        value: datetime(updated)
      }, {
        label: '会话有效期',
        value: datetime(expires)
      }]
    }
  },

  methods: {
    go (val) {
      this.$route.router.go(val)
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
      getProfile
    }
  },

  components: {
    CPane,
    CGroup,
    CButton
  }
}
</script>
