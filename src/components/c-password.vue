<template>
  <div :class="['c-password', class]">
    <button :class="['c-password-toggle', 'iconfont-view', {active: showPassword}]"
      type="button"
      @click="_toggle">
      <c-icon :value="0xe60e"></c-icon>
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
import CIcon from './c-icon'
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
  },

  components: {
    CIcon
  }
}
</script>

<style src="styles/components/password"></style>
