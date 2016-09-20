<template>
  <div :class="['c-multiline', cls]">
    <textarea
      :value="value"
      :rows="rows"
      :cols="cols"
      v-bind="attrs"
      @input="_mutate"></textarea>
  </div>
</template>

<script>
import mBase from './mixins/base'
import mField from './mixins/field'

export default {
  mixins: [mBase, mField],

  props: {
    rows: [String, Number],
    cols: [String, Number]
  }
}
</script>

<style src="styles/components/multiline"></style>
