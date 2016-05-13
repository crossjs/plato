<template>
  <div class="c-icon"
    :class="[cls, value]"
    v-if="value"></div>
</template>

<script>
export default {
  props: ['cls', 'value']
}
</script>
