<template>
  <div class="pages">
    <router-view></router-view>
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

<style src="styles/views/pages"></style>
