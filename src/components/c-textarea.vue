<template>
  <div class="c-multiline">
    <template v-if="state === 1">
      <textarea
        v-model="value"
        debounce="500"></textarea>
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
