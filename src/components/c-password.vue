<template>
  <div :class="['c-password', className, {'show-password': showPassword}]">
    <c-icon className="c-password-toggle" @click="_toggle">view</c-icon>
    <input class="c-password-input"
      :type="showPassword ? 'text' : 'password'"
      :field="field"
      :value="value"
      v-bind="attrs"
      @change="_mutate"
      @input="_mutate"
      debounce="500">
  </div>
</template>

<script>
import mField from './m-field'
import CIcon from './c-icon'
export default {
  mixins: [mField],

  data () {
    return {
      showPassword: false
    }
  },

  methods: {
    _toggle () {
      this.showPassword = !this.showPassword
    }
  },

  components: {
    CIcon
  }
}
</script>

<style src="plato-styles/password"></style>
