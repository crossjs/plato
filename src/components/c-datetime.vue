<template>
  <div class="c-datetime">
    <template v-if="state === 1">
      <input type="datetime" size="12"
        v-model="value"
        debounce="500"
        number>
    </template>
    <template v-else>
      {{datetime(value)}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
import datetime from 'nd-datetime'
export default {
  mixins: [mField],
  methods: {
    datetime
  }
}
</script>
