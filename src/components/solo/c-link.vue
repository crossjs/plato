<template>
  <div class="c-link"
    :class="[cls]"><a class="c-link-a" v-link="value.route">{{value.label}}</a></div>
</template>

<script>
import mField from './m-field'
export default {
  mixins: [mField]
}
</script>

<style src="styles/components/link"></style>
