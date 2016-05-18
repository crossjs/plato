<template>
  <div class="c-datetime"
    :class="[cls]">{{datetime(value, _attrs.format)}}</div>
</template>

<script>
import mField from './m-field'
import datetime from 'nd-datetime'
export default {
  mixins: [mField],

  computed: {
    _attrs () {
      return this.attrs || {}
    }
  },

  methods: {
    datetime
  }
}
</script>

<style src="styles/components/datetime"></style>
