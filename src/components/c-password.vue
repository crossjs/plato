<template>
  <label class="c-password" :class="{'show-password': showPassword}">
    <c-icon class="toggle"
      @click.native="showPassword = !showPassword">view</c-icon>
    <input
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      v-bind="attrs"
      @input="_mutate">
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
