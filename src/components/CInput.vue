<template>
  <!-- can NOT use present, for the reason: -->
  <!-- https://github.com/vuejs/vue-validator/issues/186 -->
  <!-- todo: parse rules? -->
  <template v-if="props.type==='multiline'">
    <textarea class="ui-form-input"
      :props="props.name"
      :placeholder="props.placeholder"
      v-model="props.value"
      v-validate="props.validate"></textarea>
  </template>
  <template v-else>
    <input class="ui-form-input"
      :type="props.type"
      :props="props.name"
      :placeholder="props.placeholder"
      v-model="props.value"
      v-validate="props.validate">
  </template>
</template>

<script>
export default {
  props: ['props']
}
</script>
