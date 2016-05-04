<template>
  <div class="c-calendar">
    <div class="c-calendar-header">
      <button @click="_prev('M')">&lt;</button>
      <button @click="_switch('M')">{{monthName}}</button>
      <button @click="_switch('y')">{{year}}</button>
      <button @click="_next('M')">&gt;</button>
    </div>
    <div v-show="showMonths" class="c-calendar-content">
      <div class="c-calendar-months">
        <span v-for="month in months" track-by="$index" :class="{selected: month.selected}" @click="_select('M', month.value)">{{month.value}}</span>
      </div>
    </div>
    <div class="c-calendar-content">
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
    value: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      showMonths: false,
      // year: 0,
      // month: 0,
      // date: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      // days: [],
      today: null,
      weekNames: ['日', '一', '二', '三', '四', '五', '六']
    }
  },

  /*eslint-disable*/
  computed: {
    // selected () {
    //
    // },
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
    months () {
      return datetime.MONTH_NAMES_ABBR.map((name, index) => {
        return {
          value: name,
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
    _switch (type) {
      switch (type) {
        case 'M':
          this.showMonths = !this.showMonths
          break
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
        case 'd':
          this.value = this.moment.add('d', value - this.date).toNumber()
          break
      }
    }
  }
}
</script>

<style src="styles/components/calendar"></style>
