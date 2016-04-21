<template>
  <div class="pages">
    <!-- todo: generate from routes config? -->
    <router-view></router-view>
    <pre v-for="page in pages" track-by="_id"><code>{{page | json}}</code></pre>
    <aside>
      <a v-link="{ path: '/pages/create' }">创建</a>
      <a v-link="{ path: '/pages' }">列表</a>
    </aside>
  </div>
</template>

<script>
import { GET } from 'utils/ajax'
import { bearer, pages } from 'vx/getters'
import { setPages } from 'vx/actions'
export default {
  methods: {
    fetchPages () {
      GET('/apis/pages')
      .then(json => {
        this.setPages(json)
      })
    }
  },

  route: {
    activate (transition) {
      if (this.bearer) {
        transition.next()
        this.fetchPages()
      } else {
        this.$route.router.go('/')
      }
    }
  },

  vuex: {
    getters: {
      bearer,
      pages
    },
    actions: {
      setPages
    }
  }
}
</script>
