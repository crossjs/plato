<template>
  <div>
    <pre><code>
    {{bearer | json}}
    </code></pre>
  </div>
</template>

<script>
import { GET } from 'utils/ajax'
import { bearer } from 'vx/getters'
export default {
  created () {
    if (this.bearer) {
      this.getProfile()
    } else {
      this.$route.router.go('/login')
    }
  },
  methods: {
    getProfile () {
      GET('/apis/profile')
      .then(json => {
        // this.setProfile(json)
        this.profile = json
      })
    }
  },
  vuex: {
    getters: {
      bearer
    }
  }
}
</script>
