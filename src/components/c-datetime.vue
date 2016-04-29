<template>
  <div class="c-datetime">
    <template v-if="state === 1">
      <input type="datetime" :value="value" size="12">
    </template>
    <template v-else>
      {{datetime(value)}}
    </template>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
export default {
  props: ['state', 'value'],
  methods: {
    datetime
  }
}
</script>
