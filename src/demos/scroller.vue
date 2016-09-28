<template>
  <div class="d-scroller">
    <div style="margin:1rem;text-align:center" v-if="!ids">pull down to reload</div>
    <c-scroller
      :height="height"
      :loading="loading"
      :drained="drained"
      @pulldown="pulldown"
      @pullup="pullup">
      <div slot="down-go">go!</div>
      <div slot="down-ready">ready?</div>
      <transition-group tag="div" name="slide-up">
        <p v-for="id in ids" :key="id">{{words[id - 1] || id}}</p>
      </transition-group>
      <div slot="up-ready">ready?</div>
      <div slot="up-go">go!</div>
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
