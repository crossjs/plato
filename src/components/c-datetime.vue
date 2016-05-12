<template>
  <div class="c-datetime"
    :class="[cls]">
    <template v-if="state === 1">
      <input
        class="c-datetime-input"
        type="text"
        :value="datetime(value)"
        @touchstart="this.showPicker = !this.showPicker"
        readonly>
      <input
        type="hidden"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
        number>
      <datepicker
        :value.sync="value"
        :show.sync="showPicker"
        ></datepicker>
    </template>
    <template v-else>
      {{datetime(value)}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
import datetime from 'nd-datetime'
import Datepicker from './c-datepicker'
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
    Datepicker
  },

  watch: {
    state (v) {
      this.$nextTick(() => {
        if (!v) {
          this.showPicker = false
        }
      })
    }
  }
}
</script>

<style src="styles/components/datetime"></style>
