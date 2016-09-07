<template>
  <div :class="['c-multiline', cls]">
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
import mField from './mixins/field'

export default {
  mixins: [mField],

  props: {
    rows: [String, Number],
    cols: [String, Number]
  }
}
</script>

<style src="styles/components/multiline"></style>
