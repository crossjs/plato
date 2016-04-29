<template>
  <div class="c-switch">
    <template v-if="state === 1">
      <input type="checkbox"
        v-model="value"
        v-bind:true-value="1"
        v-bind:false-value="0">
    </template>
    <template v-else>
      {{value ? '是' : '否'}}
    </template>
  </div>
</template>

<script>
export default {
  props: ['state', 'value']
}
</script>
