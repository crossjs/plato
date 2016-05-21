<template>
  <div :class="['c-datetime', class, {editing: editing}]">
    <template v-if="editing">
      <span class="c-datetime-input"
        @click="this.showPicker = !this.showPicker">{{datetime(value, _attrs.format)}}</span>
      <input type="hidden"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate"
        number>
      <datepicker v-if="showPicker"
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

  watch: {
    state (val) {
      this.$nextTick(() => {
        if (!val) {
          this.showPicker = false
        }
      })
    }
  },

  components: {
    Datepicker
  }
}
</script>

<style src="styles/components/datetime"></style>
