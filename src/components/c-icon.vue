<template>
  <i class="c-icon" v-html="html"><slot></slot></i>
</template>

<script>
import mBase from './mixins/base'
import aMaps from './assets/maps'

export default {
  mixins: [mBase],

  data () {
    return {
      html: ' '
    }
  },

  beforeMount () {
    this.html = aMaps[this.$slots.default[0].text] || ' '
  }
}

</script>

<style src="styles/components/icon"></style>
