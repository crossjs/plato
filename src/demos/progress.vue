<template>
  <div class="d-progress">
    <c-pane :flex="true">
      <c-col>
        <c-progress :progress="p1"></c-progress>
      </c-col>
      <i class="fs-32">p1: {{p1}}%</i>
    </c-pane>
    <c-pane :flex="true">
      <c-col>
        <c-progress :progress="p2"></c-progress>
      </c-col>
      <i class="fs-32">p2: {{p2}}%</i>
    </c-pane>
    <c-pane :flex="true">
      <c-col>
        <c-progress :progress="p1"></c-progress>
      </c-col>
      <i class="fs-32">p1: {{p1}}%</i>
      <c-col>
        <c-progress :progress="p2"></c-progress>
      </c-col>
      <i class="fs-32">p2: {{p2}}%</i>
    </c-pane>
    <c-pane>
      <c-button class="primary"
        v-tap @tap.native="shuffle">Shuffle</c-button>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CCol from 'components/core/col'
import CProgress from 'components/core/progress'
import CButton from 'components/core/button'

export default {
  data () {
    return {
      p1: 100,
      p2: 50
    }
  },

  methods: {
    shuffle () {
      function r () {
        return parseInt(Math.random() * 100, 10)
      }
      this.p1 = r()
      this.p2 = r()
    }
  },

  components: {
    CPane,
    CCol,
    CProgress,
    CButton
  }
}
</script>
