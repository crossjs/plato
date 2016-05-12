<template>
  <div class="c-datepicker"
    :class="[cls]"
    tabindex="-1"
    v-focus="show"
    v-show="show"
    transition="slide">
    <div class="c-datepicker-mask"
      @touchend.prevent="show = false"
      v-show="show"
      transition="slide"></div>
    <div class="c-datepicker-body"
      @touchmove.prevent
      v-show="show"
      transition="slide">
      <div class="c-datepicker-header">
        {{zeroPad(year)}}
        -
        {{zeroPad(month)}}
        -
        {{zeroPad(date)}}
        &nbsp;
        {{zeroPad(hour)}}
        :
        {{zeroPad(minute)}}
        :
        {{zeroPad(second)}}
      </div>
      <div class="c-datepicker-content">
        <picker
          cls="c-datepicker-years"
          :size="size"
          :value.sync="year"
          :items="years"></picker>
        <i>-</i>
        <picker
          cls="c-datepicker-months"
          :size="size"
          :value.sync="month"
          :items="months"></picker>
        <i>-</i>
        <picker
          cls="c-datepicker-dates"
          :size="size"
          :value.sync="date"
          :items="dates"></picker>
        <i></i>
        <picker
          cls="c-datepicker-hours"
          :size="size"
          :value.sync="hour"
          :items="hours"></picker>
        <i>:</i>
        <picker
          cls="c-datepicker-minutes"
          :size="size"
          :value.sync="minute"
          :items="minutes"></picker>
        <i>:</i>
        <picker
          cls="c-datepicker-seconds"
          :size="size"
          :value.sync="second"
          :items="seconds"></picker>
      </div>
    </div>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import Picker from 'components/c-picker'
export default {
  props: {
    cls: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    view: {
      type: String,
      default: 'd'
    }
  },

  data () {
    const moment = datetime(this.value)
    return {
      size: 7,
      /* eslint-disable */
      year: moment.yyyy(),
      month: moment.M(),
      date: moment.d(),
      hour: moment.h(),
      minute: moment.m(),
      second: moment.s(),
      /* eslint-enable */
      years: makeArray(1900, 2020),
      months: makeArray(1, 12),
      hours: makeArray(0, 23),
      minutes: makeArray(0, 59),
      seconds: makeArray(0, 59)
    }
  },

  computed: {
    // years () {
    //   const half = (this.size - 1) / 2
    //   return makeArray(this.year - half, this.year + half)
    // },
    dates () {
      return makeArray(1, datetime(`${this.year}-${this.month + 1}-00`, 'yyyy-MM-dd').d())
    }
  },

  watch: {
    year: watch,
    month: watch,
    date: watch,
    hour: watch,
    minute: watch,
    second: watch
  },

  methods: {
    zeroPad
  },

  components: {
    Picker
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    focus (value) {
      if (value) {
        this.vm.$nextTick(function () {
          this.$el.focus()
        })
      }
    }
  }
}

function watch () {
  this.$nextTick(() => {
    this.value = datetime(`${this.year}-${this.month}-${this.date} ${this.hour}:${this.minute}:${this.second}`).toNumber()
  })
}

function zeroPad (value) {
  if (value < 10) {
    return '0' + value
  }
  return '' + value
}

function makeArray (start, end) {
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push({
      label: zeroPad(i),
      value: i
    })
  }
  return arr
}
</script>

<style src="styles/components/datepicker"></style>
