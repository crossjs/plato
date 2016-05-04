<template>
  <div
    v-focus="show"
    v-show="show"
    tabindex="-1"
    class="c-calendar"
    @blur="_toggle(false) | debounce 500"
    @focus="_toggle(true)"
    transition="slide">
    <div class="c-calendar-header">
      <button v-show="this.view === 'd'" @click="_prev('M')">&lt;</button>
      <button @click="_switch('M')">{{monthName}}</button>
      <button @click="_switch('y')">{{year}}</button>
      <button v-show="this.view === 'd'" @click="_next('M')">&gt;</button>
    </div>
    <div v-show="view === 'y'" class="c-calendar-content">
      <div class="c-calendar-years">
        <span v-for="year in years" track-by="$index" :class="{selected: year.selected}" @click="_select('y', year.value)">{{year.value}}</span>
      </div>
    </div>
    <div v-show="view === 'M'" class="c-calendar-content">
      <div class="c-calendar-months">
        <span v-for="month in months" track-by="$index" :class="{selected: month.selected}" @click="_select('M', month.value)">{{month.label}}</span>
      </div>
    </div>
    <div v-show="view === 'd'" class="c-calendar-content">
      <div class="c-calendar-days">
        <span v-for="weekName in weekNames" track-by="$index">{{weekName}}</span>
      </div>
      <div class="c-calendar-dates">
        <span v-for="day in days" track-by="$index" :class="{empty: day.empty, today: day.today, selected: day.selected}" @click="_select('d', day.value)">{{day.value}}</span>
      </div>
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
      // hours: 0,
      // minutes: 0,
      // seconds: 0,
      weekNames: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: datetime.MONTH_NAMES_ABBR
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
    monthName () {
      return this.moment.MMM()
    },
    years () {
      return [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(value => {
        return {
          value: this.year + value,
          selected: value === 0
        }
      })
    },
    months () {
      return this.monthNames.map((name, index) => {
        return {
          label: name,
          value: index + 1,
          selected: index + 1 === this.month
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
          // selected:
          today: this.year === nowYear && this.month === nowMonth && i === nowDate
        })
      }

      const remains = (7 - (firstDayOfMonth + lastDateOfMonth) % 7) % 7
      for (let i = 1; i <= remains; i++) {
        days.push({
          value: ''
        })
      }

      return days
    }
  },
  /*eslint-enable*/

  methods: {
    _toggle (show) {
      if (show) {
        this._cancelNext = true
      } else {
        if (this._cancelNext) {
          this._cancelNext = false
          return
        }
      }
      this.show = show
    },
    _switch (type) {
      if (this.view === type) {
        this.view = 'd'
      } else {
        this.view = type
      }
    },
    _prev (type) {
      switch (type) {
        case 'M':
          this.value = this.moment.add('M', -1).toNumber()
          break
      }
    },
    _next (type) {
      switch (type) {
        case 'M':
          this.value = this.moment.add('M', 1).toNumber()
          break
      }
    },
    _select (type, value) {
      switch (type) {
        case 'y':
          this.value = this.moment.add('y', value - this.year).toNumber()
          this.view = 'd'
          break
        case 'M':
          this.value = this.moment.add('M', value - this.month).toNumber()
          this.view = 'd'
          break
        case 'd':
          this.value = this.moment.add('d', value - this.date).toNumber()
          this.show = false
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
