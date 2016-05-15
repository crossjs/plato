<template>
  <div class="c-dropdown"
    :class="[cls, {editing: editing}]">
    <template v-if="editing">
      <select
        class="c-dropdown-select"
        :field="field"
        v-model="value"
        v-bind="_attrs"
        v-validate="validate">
        <option v-for="option in attrs.options" :value="$key">
          {{ option }}
        </option>
      </select>
    </template>
    <template v-else>
      {{attrs.options[value] || '-'}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField],

  computed: {
    _attrs () {
      /*eslint no-unused-vars:[0]*/
      const { options, ...rest } = this.attrs
      return rest
    }
  }
}
</script>

<style src="styles/components/dropdown"></style>
