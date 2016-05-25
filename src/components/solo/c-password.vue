<template>
  <div :class="['c-password', class]">
    <button class="c-password-toggle iconfont-view"
      :class="{active: showPassword}"
      type="button"
      @click="_toggle"></button>
    {{_value}}
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

  computed: {
    _value () {
      return this.showPassword ? this.value : new Array((this.value || '******').length + 1).join('*')
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
