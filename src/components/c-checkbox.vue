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
      {{value ? '是' : '否'}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField],

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
