<template>
  <textarea class="c-multiline"
    @input="onChange">{{value}}</textarea>
</template>

<script>
import mBase from './mixins/base'
import mField from './mixins/field'

export default {
  mixins: [mBase, mField]
}
</script>

<style src="styles/components/multiline"></style>
