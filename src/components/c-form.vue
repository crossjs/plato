<template>
  <form :class="['c-form', cls]"
    autocomplete="off" novalidate><slot></slot></form>
</template>

<script>
import mBase from './mixins/base'

export default {
  mixins: [mBase]
}
</script>

<style src="styles/components/form"></style>
