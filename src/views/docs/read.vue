<template>
  <div class="v-docs-read">
    <c-pane class="markdown-body">{{{ content | marked }}}</c-pane>
  </div>
</template>

<script>
import marked from 'marked'
import CPane from 'components/c-pane'
import request from 'utils/request'
export default {
  data () {
    return {
      content: ''
    }
  },

  route: {
    data () {
      request(`./docs/${this.$route.params.name}`).then(text => {
        this.content = text
      })
    }
  },

  filters: {
    marked
  },

  components: {
    CPane
  }
}
</script>

<style src="github-markdown-css"></style>
