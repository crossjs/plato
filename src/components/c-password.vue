<template>
  <label class="c-password">
    <input
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      v-bind="attrs"
      @input="onChange">
    <c-icon class="c-password-toggle"
      :class="{'active': showPassword}"
      v-tap @tap.native="showPassword = !showPassword">eye</c-icon>
  </label>
</template>

<script>
import CIcon from './c-icon'
import mBase from './mixins/base'
import mField from './mixins/field'

export default {
  mixins: [mBase, mField],

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
