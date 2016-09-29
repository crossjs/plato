<template>
  <div class="d-scroller">
    <c-pane id="d-scroller-pane">
      <c-scroller
        :height="height"
        :loading="loading"
        :drained="drained"
        :infinite="infinite"
        @pulldown="pulldown"
        @pullup="pullup">
        <div slot="down-go">Release to refresh</div>
        <div slot="down-ready">Pull down to refresh</div>
        <c-button cls="primary">Pull down to refresh</c-button>
        <c-button size="xsmall" v-for="id in ids" :key="id">{{words[(id - 1) % words.length]}}</c-button>
        <c-button cls="warning" @click.native="infinite = !infinite">click to toggle infinite mode</c-button>
        <div slot="up-ready">Pull up to refresh</div>
        <div slot="up-go">Release to load</div>
      </c-scroller>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CScroller from 'components/c-scroller'
import CButton from 'components/c-button'

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

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight -
      parseInt(getComputedStyle(document.getElementById('d-scroller-pane')).marginTop) * 2
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

<style src="styles/demo"></style>
