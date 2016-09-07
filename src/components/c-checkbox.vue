<template>
  <div :class="['c-checkbox', cls, {checked: _checked}]">
    <label>
      <span v-if="_label">{{_label}}</span>
      <input type="checkbox"
        :field="field"
        :value="value"
        :checked="_checked"
        :true-value="_truthy"
        :false-value="_falsy"
        :aria-label="_label"
        @change="_mutate"
        v-bind="attrs">
    </label>
  </div>
</template>

<script>
import mField from './mixins/field'
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
      return this.extra[this._checked ? 'true-label' : 'false-label']
    },
    _checked () {
      return this.value === this._truthy
    }
  },

  methods: {
    _mutate (e) {
      this.$emit('mutate', e.target.checked ? this._truthy : this._falsy)
    }
  }
}
</script>

<style src="styles/components/checkbox"></style>
