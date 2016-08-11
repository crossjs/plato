<template>
  <div :class="['c-checkbox', className, {checked: _ok}]">
    <label>
      <span v-if="_label">{{_label}}</span>
      <input type="checkbox"
        :field="field"
        :value="value"
        :true-value="_truthy"
        :false-value="_falsy"
        :aria-label="_label"
        @change="_mutate"
        v-bind="attrs">
    </label>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  computed: {
    _truthy () {
      if (this.extra.hasOwnProperty('true-value')) {
        return this.extra['true-value']
      }
      return true
    },
    _falsy () {
      if (this.extra.hasOwnProperty('false-value')) {
        return this.extra['false-value']
      }
      return false
    },
    _label () {
      return this.extra[this._ok ? 'true-label' : 'false-label']
    },
    _ok () {
      return this.value === this._truthy
    }
  }
}
</script>

<style src="plato-styles/checkbox"></style>
