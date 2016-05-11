<template>
  <div class="profile">
    <list
      :title="title"
      :items="items"
      ></list>
  </div>
</template>

<script>
import datatime from 'nd-datetime'
import { profile } from 'vx/getters'
import { getProfile } from 'vx/actions'
import List from 'components/c-list'
export default {
  data () {
    return {
      title: '用户信息'
    }
  },

  computed: {
    items () {
      const profile = this.profile
      return profile ? [
        {
          label: '名称',
          value: profile.username
        },
        {
          label: '状态',
          value: profile.state
        },
        {
          label: '创建时间',
          value: datatime(profile.created)
        },
        {
          label: '活跃时间',
          value: datatime(profile.updated)
        }
      ] : []
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
    List
  }
}
</script>
