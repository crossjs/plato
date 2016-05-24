<template>
  <div :class="['c-password', class, {editing: editing}]">
    <template v-if="editing">
      <button class="c-password-toggle iconfont-view"
        :class="{active: showPassword}"
        type="button"
        @click="_toggle"></button>
      <input class="c-password-input"
        :type="showPassword ? 'text' : 'password'"
        :field="field"
        v-model="value"
        v-bind="attrs"
        @change="_validate"
        debounce="500">
    </template>
    <template v-else>
      {{_value}}
    </template>
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
      return new Array((this.value || '******').length).join('*')
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
