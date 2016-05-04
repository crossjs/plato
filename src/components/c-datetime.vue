<template>
  <div class="c-datetime">
    <template v-if="state === 1">
      <input
        class="c-form-input"
        type="datetime"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
        debounce="500"
        number>
      <calendar
        :value="value"
        ></calendar>
    </template>
    <template v-else>
      {{datetime(value)}}
    </template>
  </div>
</template>

<script>
import mField from 'mixins/m-field'
import datetime from 'nd-datetime'
import Calendar from './c-calendar'
export default {
  mixins: [mField],
  methods: {
    datetime
  },
  components: {
    Calendar
  }
}
</script>
