<template>
  <div :class="['c-datetime', class, {editing: editing}]">
    <template v-if="editing">
      <input class="c-datetime-input"
        type="text"
        :value="datetime(value, _attrs.format)"
        @click="this.showPicker = !this.showPicker"
        readonly>
      <input type="hidden"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate"
        number>
      <datepicker
        :value.sync="value"
        :format="_attrs.format"
        :show.sync="showPicker"></datepicker>
    </template>
    <template v-else>
      {{datetime(value, _attrs.format)}}
    </template>
  </div>
</template>

<script>
import mField from './m-field'
import datetime from 'nd-datetime'
import Datepicker from '../solo/c-datepicker'
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
