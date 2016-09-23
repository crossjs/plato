<template>
  <div class="d-scroller">
    <c-scroller ref="scroller"
      :loading="loading"
      @pulldown="pulldown"
      @pullup="pullup">
      <p v-for="id in ids">{{id}}</p>
    </c-scroller>
  </div>
</template>

<script>
import CScroller from 'components/c-scroller'

export default {
  mounted () {
    this.$refs.scroller.$el.style.height = window.innerHeight - document.getElementById('header').clientHeight + 'px'
  },

  data () {
    return {
      ids: 30,
      loading: false
    }
  },

  methods: {
    pulldown () {
      this.loading = true
      setTimeout(() => {
        this.ids = 30
        this.loading = false
      }, 1000)
    },
    pullup () {
      this.loading = true
      setTimeout(() => {
        this.ids += 30
        this.loading = false
      }, 1000)
    }
  },

  components: {
    CScroller
  }
}
</script>

<style src="styles/demo"></style>
