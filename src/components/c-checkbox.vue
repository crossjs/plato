<template>
  <div class="c-checkbox"
    :class="[cls, {editing: editing, checked: value}]">
    <template v-if="editing">
      <input type="checkbox"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate">
      <label>{{value ? _attrs['true-label'] : _attrs['false-label']}}</label>
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
