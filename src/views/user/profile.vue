<template>
  <div class="profile">
    <validator name="validation">
      <list
        :state="state"
        :title="title"
        :items="items"
        ></list>
      <pane>
        <button class="button primary"
          @click="_click">修改资料</button>
      </pane>
    </validator>
  </div>
</template>

<script>
import { profile } from 'vx/getters'
import { getProfile } from 'vx/actions'
import List from 'components/c-list'
import Pane from 'components/c-pane'
export default {
  data () {
    return {
      state: 0,
      title: '用户信息'
    }
  },

  computed: {
    items () {
      const profile = this.profile
      return profile ? {
        username: {
          label: '账号',
          value: profile.username,
          type: 'text'
        },
        state: {
          label: '状态',
          value: profile.state,
          type: 'checkbox',
          attrs: {
            'true-label': '正常',
            'false-label': '禁用'
          }
        },
        created: {
          label: '创建时间',
          value: profile.created,
          type: 'datetime'
        },
        updated: {
          label: '活跃时间',
          value: profile.updated,
          type: 'datetime'
        }
      } : null
    }
  },

  methods: {
    _click () {
      this.state = 2 + ~this.state
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
    List,
    Pane
  }
}
</script>
