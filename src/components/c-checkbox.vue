<template>
  <div class="c-checkbox"
    :class="[cls, {checked: value}]">
    <template v-if="state === 1">
      <input
        type="checkbox"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate">
    </template>
    <template v-else>
      {{value ? _attrs['true-label'] : _attrs['false-label']}}
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
        'false-value': 0,
        'true-label': '是',
        'false-label': '否'
      }, this.attrs)
    }
  }
}
</script>

<style src="styles/components/checkbox"></style>
