<template>
  <div>
    <c-pane>
      <c-progress :progress="p1"></c-progress>
    </c-pane>
    <c-pane>
      <c-progress :progress="p2"></c-progress>
    </c-pane>
    <c-pane>
      <c-progress :progress="p3"></c-progress>
    </c-pane>
    <c-pane>
      <c-progress :progress="p4"></c-progress>
    </c-pane>
    <c-pane>
      <c-progress></c-progress>
    </c-pane>
    <c-pane>
      <c-button v-tap="shuffle">Shuffle</c-button>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/c-pane'
import CProgress from 'components/c-progress'
import CButton from 'components/c-button'

export default {
  data () {
    return {
      p1: 100,
      p2: 80,
      p3: 50,
      p4: 10
    }
  },
  methods: {
    shuffle () {
      function r () {
        return parseInt(Math.random() * 100, 10)
      }
      this.p1 = r()
      this.p2 = r()
      this.p3 = r()
      this.p4 = r()
    }
  },
  components: {
    CPane,
    CProgress,
    CButton
  }
}
</script>
