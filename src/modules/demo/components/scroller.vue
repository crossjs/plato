<template>
  <c-pane class="main">
    <c-scroller
      :transition="transition"
      :height="height"
      :loading="loading"
      :drained="drained"
      :infinite="infinite"
      @pulldown="pulldown"
      @pullup="pullup">
      <template slot="pulldown" scope="props">
        <div v-if="props.downGo">Release to refresh</div>
        <div v-else-if="props.downReady">Pull down to refresh</div>
        <div v-else-if="props.downAwaiting">Refreshing...</div>
      </template>
      <c-button class="primary">Pull down to refresh</c-button>
      <c-button size="xsmall" v-for="id in ids" :key="id">{{words[(id - 1) % words.length]}}</c-button>
      <c-button class="warning" v-tap @tap.native="infinite = !infinite">click to toggle infinite mode</c-button>
      <template slot="pullup" scope="props">
        <div v-if="props.upGo">Release to load</div>
        <div v-else-if="props.upReady">Pull up to load</div>
        <div v-else-if="props.upAwaiting">Loading...</div>
      </template>
    </c-scroller>
  </c-pane>
</template>

<script>
import CPane from 'components/core/pane'
import CScroller from 'components/core/scroller'
import CButton from 'components/core/button'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      ids: '',
      loading: false,
      drained: false,
      infinite: false,
      height: 0,
      words: [
        'have slots:',
        'down-go, down-ready',
        'up-go, up-ready.',
        '-',
        'emit events:',
        'pulldown, pullup.'
      ]
    }
  },

  computed: mapGetters(['transition']),

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight -
      parseInt(getComputedStyle(this.$el).marginTop, 10) * 2
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
        if (Math.random() < 0.75) {
          this.ids = +this.ids + 10
        } else {
          this.drained = true
        }
        this.loading = false
      }, 1000)
    }
  },

  components: {
    CPane,
    CScroller,
    CButton
  }
}
</script>

<style scoped>
.c-button {
  margin: 0.5em 0;
}
</style>
