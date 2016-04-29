<template>
  <div class="c-text">
    <template v-if="state === 1">
      <input type="text" :value="value" size="12">
    </template>
    <template v-else>
      {{value}}
    </template>
  </div>
</template>

<script>
export default {
  props: ['state', 'value']
}
</script>
