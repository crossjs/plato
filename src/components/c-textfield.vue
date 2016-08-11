<template>
  <div :class="['c-textfield', className]">
    <input class="c-textfield-input"
      :type="type"
      :field="field"
      :value="value"
      v-bind="attrs"
      @change="_mutate"
      @input="_mutate"
      debounce="500">
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style src="plato-styles/textfield"></style>
