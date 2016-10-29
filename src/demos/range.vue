<template>
  <div>
    <c-row class="padding" :flex="false">
      <c-range
        :value="value"
        @change="change"></c-range>
      <p class="center">value: {{value}}, min: 0, max: 100</p>
    </c-row>
    <c-row class="padding" :flex="false">
      <c-range
        :value="value"
        :step="10"
        @change="change"></c-range>
      <p class="center">step: 10, value: {{value}}, min: 0, max: 100</p>
    </c-row>
    <c-row class="padding" :flex="false">
      <c-range
        :value="value"
        :step="20"
        @change="change"></c-range>
      <p class="center">step: 20, value: {{value}}, min: 0, max: 100</p>
    </c-row>
    <c-row class="padding" :flex="false">
      <c-range
        :min="20"
        :max="80"
        :value="value2"
        @change="change2"></c-range>
      <p class="center">value2: {{value2}}, min: 20, max: 80</p>
    </c-row>
    <c-row class="padding" :flex="false">
      <c-range
        :min="20"
        :max="80"
        :value="value2"
        :step="2"
        @change="change2"></c-range>
      <p class="center">step: 2, value2: {{value2}}, min: 20, max: 80</p>
    </c-row>
    <c-row class="padding" :flex="false">
      <c-range
        :min="20"
        :max="80"
        :value="value2"
        :step="3"
        @change="change2"></c-range>
      <p class="center">step: 3, value2: {{value2}}, min: 20, max: 80</p>
    </c-row>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CRange from 'components/c-range'

export default {
  data () {
    return {
      value: 40,
      value2: 50
    }
  },

  methods: {
    change (val) {
      this.value = val
    },
    change2 (val) {
      this.value2 = val
    }
  },

  components: {
    CRow,
    CRange
  }
}
</script>
