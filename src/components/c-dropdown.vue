<template>
  <div :class="['c-dropdown', className, align]">
    <select
      class="c-dropdown-select"
      :field="field"
      :value="value"
      v-bind="attrs"
      @change="_mutate">
      <option v-for="option in _options" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  computed: {
    _options () {
      return this.extra.options || []
    }
  }
}
</script>

<style src="plato-styles/dropdown"></style>
