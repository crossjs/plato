<template>
  <div :class="['c-dropdown', cls, align]">
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
import mField from './mixins/field'
export default {
  mixins: [mField],

  computed: {
    _options () {
      return this.extra.options || []
    }
  }
}
</script>

<style src="styles/components/dropdown"></style>
