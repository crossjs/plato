<template>
  <div class="c-progress">
    <div class="c-progress-content"
      :style="{'transform': 'translateX(-' + (100 - progress) + '%)'}"></div>
  </div>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],

  props: {
    progress: {
      type: Number,
      default: 0,
      validator (val) {
        return +val >= 0 && +val <= 100
      }
    }
  }
}
</script>

<style src="styles/components/progress"></style>
