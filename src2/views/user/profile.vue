<template>
  <div class="profile">
    <pre><code>{{profile | json}}</code></pre>
  </div>
</template>

<script>
import { GET } from 'utils/ajax'
import { bearer } from 'vx/getters'
import { profile } from 'vx/getters'
import { setProfile } from 'vx/actions'
export default {
  methods: {
    getProfile () {
      return GET('/apis/profile')
      .then(json => {
        this.setProfile(json)
      })
    }
  },

  route: {
    activate (transition) {
      if (this.bearer) {
        return this.getProfile()
      } else {
        this.$route.router.go('/login')
      }
    }
  },

  vuex: {
    getters: {
      bearer,
      profile
    },
    actions: {
      setProfile
    }
  }
}
</script>
