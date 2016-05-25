<template>
  <div :class="['c-datetime', class]">
    {{datetime(value, attrs.format)}}
  </div>
</template>

<script>
import mField from './m-field'
import datetime from 'nd-datetime'
export default {
  mixins: [mField],

  methods: {
    datetime
  },

  filters: {
    datetime
  }
}
</script>

<style src="styles/components/datetime"></style>
