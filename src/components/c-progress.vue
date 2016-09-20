<template>
  <i :class="['c-progress', cls]"
    :style="{width: '' + progress + '%'}"></i>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],
  props: {
    progress: {
      type: [String, Number],
      default: 0
    }
  }
}
</script>

<style src="styles/components/progress"></style>
