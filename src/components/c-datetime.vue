<template>
  <div class="c-datetime">
    <template v-if="state === 1">
      <input
        class="c-form-input"
        type="text"
        :value="datetime(value)"
        @click="this.showCalendar = !this.showCalendar"
        readonly>
      <input
        type="hidden"
        :field="field"
        v-model="value"
        v-bind="attrs"
        v-validate="validate"
        number>
      <calendar
        :value.sync="value"
        :show.sync="showCalendar"
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
  data () {
    return {
      showCalendar: false
    }
  },
  methods: {
    datetime
  },
  components: {
    Calendar
  }
}
</script>
