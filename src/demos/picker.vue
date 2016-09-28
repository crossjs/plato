<template>
  <div class="d-picker">
    <c-row>
      <c-col>
        <c-picker
          :index="index"
          @change="change">
          <p class="c-picker-item" v-for="item in items">{{item}}</p>
        </c-picker>
      </c-col>
        <c-picker
          :index="index"
          @change="change">
          <p class="c-picker-item" v-for="item in items">{{item}}</p>
        </c-picker>
      </c-col>
    </c-row>
    <hr>
    <p>Picked: {{picked}}</p>
  </div>
</template>

<script>
import CRow from 'components/c-row'
import CCol from 'components/c-col'
import CPicker from 'components/c-picker'

export default {
  data () {
    return {
      items: ['Please select', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      index: 0
    }
  },

  computed: {
    picked () {
      return this.items[this.index]
    }
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
