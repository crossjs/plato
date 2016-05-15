<template>
  <div class="c-password"
    :class="[cls, {editing: editing}]">
    <template v-if="editing">
      <input class="c-password-input"
        type="password"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
        debounce="500">
    </template>
    <template v-else>
      {{new Array((value || '******').length).join('*')}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/password"></style>
