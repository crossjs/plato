<template>
  <div class="c-progress" :style="{'padding-left': '' + progress + '%'}"></div>
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
