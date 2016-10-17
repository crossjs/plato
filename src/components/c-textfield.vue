<template>
  <input class="c-textfield"
    :value="value"
    @input="onChange">
</template>

<script>
import mBase from './mixins/base'
import mField from './mixins/field'

export default {
  mixins: [mBase, mField]
}
</script>

<style src="styles/components/textfield"></style>
