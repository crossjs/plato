<template>
  <div class="c-labe"
    :class="[cls]"
    v-if="value">{{value}}</div>
</template>

<script>
export default {
  props: ['cls', 'value']
}
</script>
