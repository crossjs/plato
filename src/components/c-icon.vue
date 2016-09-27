<template>
  <i :class="['c-icon', cls]"><slot></slot></i>
</template>

<script>
import mBase from './mixins/base'
import aMaps from './assets/maps'

export default {
  mixins: [mBase],

  mounted () {
    this.$el.innerHTML = aMaps[this.$el.textContent] || ' '
  }
}

</script>

<style src="styles/components/icon"></style>
