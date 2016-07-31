<template>
  <div class="v-docs">
    <c-pane>
      <c-dropdown
        :value="chapter"
        :extra="{options: chapters}"
        @mutate="_mutate"></c-dropdown>
    </c-pane>
    <router-view></router-view>
  </div>
</template>

<script>
import request from 'plato-request'
import CPane from 'plato-components/c-pane'
import CDropdown from 'plato-components/c-dropdown'
export default {
  data () {
    return {
      chapters: [],
      chapter: null
    }
  },

  methods: {
    _mutate (val) {
      this.$router.push({
        name: 'docs/read',
        params: {
          name: val
        }
      })
      this.chapter = val
    }
  },

  created () {
    request('./docs/README.md').then(text => {
      const chapters = []
      // - [使用 vuex](vuex.md)
      const RE = /\-\s+\[([^\[\]\(\)]+)\]\(([^\[\]\(\)]+)\)\n/img
      let matched
      while ((matched = RE.exec(text))) {
        chapters.push({
          label: matched[1],
          value: matched[2]
        })
      }
      this.chapter = chapters[0].value
      this.chapters = chapters

      if (!this.$route.params.name) {
        this.chapter = chapters[0].value
        this.$router.replace({
          name: 'docs/read',
          params: {
            name: this.chapter
          }
        })
      } else {
        this.chapter = this.$route.params.name
      }
    })
  },

  components: {
    CPane,
    CDropdown
  }
}
</script>

<style src="styles/views/docs"></style>
