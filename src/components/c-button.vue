<template>
  <button class="c-button" :class="size" type="button"><slot></slot></button>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase],

  props: {
    size: {
      type: String,
      default: '',
      validator (value) {
        return /^(x?(large|small))?$/.test(value)
      }
    }
  }
}
</script>

<style src="styles/components/button"></style>
