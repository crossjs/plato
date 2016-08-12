<template>
  <div :class="['c-multiline', className]">
    <textarea class="c-multiline-textarea"
      :field="field"
      :value="value"
      :rows="rows"
      :cols="cols"
      v-bind="attrs"
      @input="_mutate"></textarea>
  </div>
</template>

<script>
import mField from './m-field'

export default {
  mixins: [mField],

  props: {
    rows: [String, Number],
    cols: [String, Number]
  }
}
</script>

<style src="plato-styles/multiline"></style>
