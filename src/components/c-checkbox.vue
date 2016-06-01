<template>
  <div :class="['c-checkbox', class, {checked: _valid}]">
    <input type="checkbox"
      :field="field"
      :true-value="_true"
      :false-value="_false"
      v-model="value"
      v-bind="_attrs">
    <label v-if="_label">{{_label}}</label>
  </div>
</template>

<script>
import mField from './m-form-field'
export default {
  mixins: [mField],

  computed: {
    _true () {
      if (this.extra.hasOwnProperty('true-value')) {
        return this.extra['true-value']
      }
      return true
    },
    _false () {
      if (this.extra.hasOwnProperty('false-value')) {
        return this.extra['false-value']
      }
      return false
    },
    _label () {
      return this.extra[this._valid ? 'true-label' : 'false-label']
    },
    _valid () {
      return this.value === this._true
    }
  }
}
</script>

<style src="styles/components/checkbox"></style>
