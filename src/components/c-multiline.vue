<template>
  <label class="c-multiline">
    <textarea
      :rows="rows"
      :cols="cols"
      v-bind="attrs"
      @input="_change">{{value}}</textarea>
  </label>
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
