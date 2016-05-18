<template>
  <div class="c-text"
    :class="[cls]">{{value}}</div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/text"></style>
