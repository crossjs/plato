<template>
  <div class="v-docs-read">
    <c-pane class="markdown-body">{{{ content }}}</c-pane>
  </div>
</template>

<script>
import marked from 'marked'
import request from 'plato-request'
import CPane from 'plato-components/c-pane'
export default {
  data () {
    return {
      content: ''
    }
  },

  route: {
    data () {
      request(`./docs/${this.$route.params.name}`).then(text => {
        this.content = marked(text)
      })
    }
  },

  components: {
    CPane
  }
}
</script>

<style src="github-markdown-css"></style>
