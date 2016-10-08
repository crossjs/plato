<template>
  <div class="d-picker">
    <c-row>
      <c-col>
        <c-picker
          :transition="transition"
          :index="index"
          @change="change">
          <p v-for="item in items">{{item}}</p>
        </c-picker>
      </c-col>
        <c-picker
          :transition="transition"
          :index="index"
          @change="change">
          <p v-for="item in items">{{item}}</p>
        </c-picker>
      </c-col>
    </c-row>
    <p>Selected: {{picked}}</p>
    <hr>
    <c-row>
      <c-col>
        <c-picker
          :transition="transition"
          :index="year"
          :size="3"
          @change="year = arguments[0]">
          <p v-for="item in yearList">{{item}}</p>
        </c-picker>
      </c-col>
      <c-col>
        <c-picker
          :transition="transition"
          :index="month"
          :size="3"
          @change="month = arguments[0]">
          <p v-for="item in 12">{{item}}</p>
        </c-picker>
      </c-col>
      <c-col>
        <c-picker
          :transition="transition"
          :index="date"
          :size="3"
          @change="date = arguments[0]">
          <p v-for="item in dateMax">{{item}}</p>
        </c-picker>
      </c-col>
    </c-row>
    <hr>
    <p>Selected: {{yearList[year]}} - {{month + 1}} - {{date + 1}}</p>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CCol from 'components/c-col'
import CPicker from 'components/c-picker'
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
      return this.year < this.yearList.length ? new Date(this.yearList[this.year], this.month + 1, 0).getDate() : 31
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
    }
  },

  components: {
    CRow,
    CCol,
    CPicker
  }
}
</script>

<style src="styles/demo"></style>
