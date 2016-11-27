<template>
  <span class="c-password">
    <c-textfield
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      v-bind="attrs"
      @change="onChange"></c-textfield>
    <c-icon class="c-password-toggle"
      :class="{active: showPassword}"
      v-tap @tap.native="toggle">eye</c-icon>
  </span>
</template>

<script>
import CTextfield from './textfield'
import CIcon from './icon'
import mField from './mixins/field'

export default {
  mixins: [mField],

  props: {
    attrs: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      showPassword: false
    }
  },

  methods: {
    toggle () {
      this.showPassword = !this.showPassword
    },
    onChange (value) {
      // override
      this.$emit('change', value)
    }
  },

  components: {
    CTextfield,
    CIcon
  }
}
</script>

<style src="./styles/password"></style>
