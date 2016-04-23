<template>
  <div class="progress" :style="{width: '' + progress + '%'}"></div>
</template>

<script>
import { progress } from 'vx/getters'
export default {
  vuex: {
    getters: {
      progress
    }
  }
}
</script>

<style src="styles/views/components/progress"></style>
