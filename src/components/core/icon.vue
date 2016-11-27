<template>
  <i class="c-icon" v-html="html"><slot></slot></i>
</template>

<script>
import entities from './assets/icon-entities'

export default {
  data () {
    return {
      html: ' '
    }
  },

  beforeMount () {
    this.html = entities[this.$slots.default[0].text] || ' '
  },

  beforeUpdate () {
    this.html = entities[this.$slots.default[0].text] || ' '
  }
}

</script>

<style src="./styles/icon"></style>
