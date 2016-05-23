<template>
  <div :class="['c-checkbox', class, {editing: editing, checked: _valid}]">
    <template v-if="editing">
      <input type="checkbox"
        :field="field"
        v-model="value"
        v-bind="_attrs">
      <label>{{_valid ? _attrs['true-label'] : _attrs['false-label']}}</label>
    </template>
    <template v-else>
      {{_valid ? _attrs['true-label'] : _attrs['false-label']}}
    </template>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField],

  computed: {
    _valid () {
      return this.value === this._attrs['true-value']
    },
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
