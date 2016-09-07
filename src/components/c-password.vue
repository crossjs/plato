<template>
  <div :class="['c-password', cls, {'show-password': showPassword}]">
    <c-icon cls="c-password-toggle" @click.native="_toggle">view</c-icon>
    <input class="c-password-input"
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

<style src="styles/components/password"></style>
