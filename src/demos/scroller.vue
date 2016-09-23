<template>
  <div class="d-scroller">
    <c-scroller ref="scroller"
      :height="height"
      :loading="loading"
      :drained="drained"
      @pulldown="pulldown"
      @pullup="pullup">
      <p v-for="id in ids">{{id}}</p>
    </c-scroller>
  </div>
</template>

<script>
import CScroller from 'components/c-scroller'

export default {
  data () {
    return {
      ids: '',
      loading: false,
      drained: false,
      height: 0
    }
  },

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight
  },

  methods: {
    pulldown () {
      this.loading = true
      setTimeout(() => {
        this.ids = 10
        this.drained = false
        this.loading = false
      }, 1000)
    },
    pullup () {
      this.loading = true
      setTimeout(() => {
        if (Math.random() < 0.5) {
          this.ids = +this.ids + 10
        } else {
          this.drained = true
        }
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
