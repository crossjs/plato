<template>
  <div class="c-text">
    <template v-if="state === 1">
      <input
        class="ui-form-input"
        type="password"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
        debounce="500">
    </template>
    <template v-else>
      {{new Array((value||'******').length).join('*')}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField]
}
</script>
