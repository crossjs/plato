<template>
  <div :class="['c-datetime', className]">
    <span class="c-datetime-input"
      @click="showPicker = !showPicker">{{datetime(value, attrs.format).format()}}</span>
    <input type="hidden"
      :field="field"
      :value="value"
      v-bind="attrs"
      number>
    <c-datepicker v-if="showPicker"
      :value="value"
      :format="attrs.format"
      :show="showPicker"></c-datepicker>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import mField from './m-field'
import CDatepicker from './c-datepicker'
export default {
  mixins: [mField],

  data () {
    return {
      showPicker: false
    }
  },

  methods: {
    datetime
  },

  components: {
    CDatepicker
  }
}
</script>

<style src="plato-styles/datetime"></style>
