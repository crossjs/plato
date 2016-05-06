<template>
  <div class="c-checkbox">
    <template v-if="state === 1">
      <input
        type="checkbox"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate">
    </template>
    <template v-else>
      {{value ? trueLabel : falseLabel}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField],

  props: {
    trueLabel: {
      type: String,
      default: '是'
    },
    falseLabel: {
      type: String,
      default: '否'
    }
  },

  computed: {
    _attrs () {
      return Object.assign({
        'true-value': 1,
        'false-value': 0
      }, this.attrs)
    }
  }
}
</script>

<style src="styles/components/checkbox"></style>
