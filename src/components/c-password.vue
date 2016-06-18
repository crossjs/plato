<template>
  <div :class="['c-password', class]">
    <button :class="['c-password-toggle', {active: showPassword}]"
      type="button"
      @click="_toggle">
    </button>
    <input class="c-form-field c-password-input"
      :type="showPassword ? 'text' : 'password'"
      :field="field"
      v-model="value"
      v-bind="_attrs"
      @change="_validate"
      debounce="500">
  </div>
</template>

<script>
import mField from './m-field'
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
  }
}
</script>

<style src="styles/components/password"></style>
