<template>
  <div class="c-text">
    <template v-if="state === 1">
      <input type="text" size="12"
        v-model="value"
        debounce="500">
    </template>
    <template v-else>
      {{value}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
export default {
  mixins: [mField]
}
</script>
