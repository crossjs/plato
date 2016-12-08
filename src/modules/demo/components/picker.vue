<template>
  <div class="main">
    <c-pane :flex="true">
      <c-col>
        <c-picker
          :transition="transition"
          :index="index"
          @change="change">
          <p v-for="item in items">{{item}}</p>
        </c-picker>
      </c-col>
      <c-col>
        <c-picker
          :transition="transition"
          :index="index"
          @change="change">
          <p v-for="item in items">{{item}}</p>
        </c-picker>
      </c-col>
    </c-pane>
    <p class="center">Selected: {{picked}}</p>
    <hr>
    <c-pane :flex="true">
      <c-col>
        <c-picker
          :transition="transition"
          :index="year"
          :size="3"
          @change="changeYear">
          <p v-for="item in yearList" :key="item">{{item}}</p>
        </c-picker>
      </c-col>
      <c-col class="center">-</c-col>
      <c-col>
        <c-picker
          :transition="transition"
          :index="month"
          :size="3"
          @change="changeMonth">
          <p v-for="item in 12" :key="item">{{item}}</p>
        </c-picker>
      </c-col>
      <c-col class="center">-</c-col>
      <c-col>
        <c-picker
          :transition="transition"
          :index="date"
          :size="3"
          @change="changeDate">
          <p v-for="item in dateMax" :key="item + '/' + dateMax">{{item}}</p>
        </c-picker>
      </c-col>
    </c-pane>
    <hr>
    <p class="center">Selected: {{yearList[year]}} - {{month + 1}} - {{date + 1}}</p>
  </div>
</template>

<script>
import CPane from 'components/core/pane'
import CCol from 'components/core/col'
import CPicker from 'components/core/picker'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      items: ['Please select', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      index: 3,
      year: 1,
      yearList: [],
      month: 1,
      date: 28
    }
  },

  computed: {
    ...mapGetters(['transition']),
    picked () {
      return this.items[this.index]
    },
    dateMax () {
      return this.year < this.yearList.length ? new Date(this.yearList[this.year], this.month + 1, 0).getDate() : 0
    }
  },

  mounted () {
    setTimeout(() => {
      this.yearList = [2017, 2016, 2015]
    }, 500)
  },

  methods: {
    change (index) {
      this.index = index
    },
    changeYear (year) {
      this.year = year
    },
    changeMonth (month) {
      this.month = month
    },
    changeDate (date) {
      this.date = date
    }
  },

  components: {
    CPane,
    CCol,
    CPicker
  }
}
</script>

<style scoped>
p {
  font-size: dpr(48px);
  line-height: dpr(60px);
}
</style>
