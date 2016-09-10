<template>
  <div :class="['c-password', {'show-password': showPassword}, cls]">
    <c-icon cls="toggle"
      @click.native="showPassword = !showPassword">view</c-icon>
    <input
      :type="showPassword ? 'text' : 'password'"
      :field="field"
      :value="value"
      v-bind="attrs"
      @input="_mutate">
  </div>
</template>

<script>
import mField from './mixins/field'
import CIcon from './c-icon'

export default {
  mixins: [mField],

  data () {
    return {
      showPassword: false
    }
  },

  components: {
    CIcon
  }
}
</script>

<style src="styles/components/password"></style>
