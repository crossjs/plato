<template>
  <div
    v-focus="show"
    v-show="show"
    tabindex="-1"
    class="c-calendar"
    @blur="show = false"
    @focus="show = true"
    transition="slide">
    <div class="c-calendar-header">
      <a @click="_switch('y')">{{year}}</a>
      -
      <a @click="_switch('M')">{{_zeroPad(month)}}</a>
      -
      <a @click="_switch('d')">{{_zeroPad(date)}}</a>
    </div>
    <div v-show="view === 'y'" class="c-calendar-content">
      <div class="c-calendar-years">
        <span v-for="year in years"
          track-by="$index"
          :class="{selected: year.selected}"
          @click="_select('y', year.value)">{{year.value}}</span>
      </div>
    </div>
    <div v-show="view === 'M'" class="c-calendar-content">
      <div class="c-calendar-months">
        <span v-for="i in 12"
          track-by="$index"
          :class="{selected: i + 1 === month}"
          @click="_select('M', i + 1)">{{_zeroPad(i + 1)}}</span>
      </div>
    </div>
    <div v-show="view === 'd'" class="c-calendar-content">
      <div class="c-calendar-days">
        <span v-for="weekName in weekNames"
          track-by="$index">{{weekName}}</span>
      </div>
      <div class="c-calendar-dates">
        <span v-for="day in days"
          track-by="$index"
          :class="{empty: day.empty, today: day.today, selected: day.selected}" @click="_select('d', day.value)">{{day.value}}</span>
      </div>
    </div>
    <div v-show="view === 'h'" class="c-calendar-content">
      <div class="c-calendar-hours">
        <span v-for="i in 24"
          track-by="$index"
          :class="{selected: i === hour}"
          @click="_select('h', i)">{{i}}</span>
      </div>
    </div>
    <div v-show="view === 'm'" class="c-calendar-content">
      <div class="c-calendar-minutes">
        <span v-for="i in 60"
          track-by="$index"
          :class="{selected: i === minute}"
          @click="_select('m', i)">{{i}}</span>
      </div>
    </div>
    <div v-show="view === 's'" class="c-calendar-content">
      <div class="c-calendar-seconds">
        <span v-for="i in 60"
          track-by="$index"
          :class="{selected: i === second}"
          @click="_select('s', i)">{{i}}</span>
      </div>
    </div>
    <div class="c-calendar-footer">
      <a @click="_switch('h')">{{_zeroPad(hour)}}</a>
      :
      <a @click="_switch('m')">{{_zeroPad(minute)}}</a>
      :
      <a @click="_switch('s')">{{_zeroPad(second)}}</a>
    </div>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
export default {
  props: {
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
    return {
      weekNames: ['日', '一', '二', '三', '四', '五', '六']
    }
  },

  /*eslint-disable*/
  computed: {
    moment () {
      return datetime(this.value)
    },
    year () {
      return this.moment.yyyy()
    },
    month () {
      return this.moment.M()
    },
    date () {
      return this.moment.d()
    },
    hour () {
      return this.moment.h()
    },
    minute () {
      return this.moment.m()
    },
    second () {
      return this.moment.s()
    },
    // monthName () {
      // return this.moment.MMM()
    // },
    years () {
      return [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(value => {
        return {
          value: this.year + value,
          selected: value === 0
        }
      })
    },
    days () {
      const firstDayOfMonth = datetime(`${this.year}-${this.month}-01`, 'yyyy-MM-dd').D()
      const lastDateOfPreviousMonth = datetime(`${this.year}-${this.month}-00`, 'yyyy-MM-dd').d()
      const lastDateOfMonth = datetime(`${this.year}-${this.month + 1}-00`, 'yyyy-MM-dd').d()
      const days = []

      for (let i = 1; i <= firstDayOfMonth; i++) {
        days.push({
          value: '',
          empty: true
        })
      }

      const now = datetime()
      const nowYear = now.yyyy()
      const nowMonth = now.M()
      const nowDate = now.d()

      for (let i = 1; i <= lastDateOfMonth; i++) {
        days.push({
          value: i,
          selected: this.date === i,
          today: this.year === nowYear && this.month === nowMonth && i === nowDate
        })
      }

      const remains = (7 - (firstDayOfMonth + lastDateOfMonth) % 7) % 7
      for (let i = 1; i <= remains; i++) {
        days.push({
          value: '',
          empty: true
        })
      }

      return days
    }
  },
  /*eslint-enable*/

  methods: {
    _zeroPad (value) {
      if (value < 10) {
        return '0' + value
      }

      return '' + value
    },
    _toggle (show) {
      this.show = show
    },
    _switch (type) {
      this.view = type
    },
    _select (type, value) {
      switch (type) {
        case 'y':
          this.value = this.moment.add('y', value - this.year).toNumber()
          break
        case 'M':
          this.value = this.moment.add('M', value - this.month).toNumber()
          break
        case 'd':
          this.value = this.moment.add('d', value - this.date).toNumber()
          break
        case 'h':
          this.value = this.moment.add('h', value - this.hour).toNumber()
          break
        case 'm':
          this.value = this.moment.add('m', value - this.minute).toNumber()
          break
        case 's':
          this.value = this.moment.add('s', value - this.second).toNumber()
          break
      }
    }
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
</script>

<style src="styles/components/calendar"></style>
