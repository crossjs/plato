<template>
  <div :class="['c-password', class, {editing: editing}]">
    <template v-if="editing">
      <input class="c-password-input"
        type="password"
        :field="field"
        v-model="value"
        v-bind="attrs"
        @change="_validate"
        debounce="500">
    </template>
    <template v-else>
      {{new Array((value || '******').length).join('*')}}
    </template>
  </div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/password"></style>
