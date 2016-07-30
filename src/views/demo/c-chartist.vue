<template>
  <div :class="['c-chartist', className, ratio, noData]">{{message}}</div>
</template>

<script>
import Chartist from 'chartist'
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    ratio: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true,
      validator (val) {
        return val === 'Pie' || val === 'Line' || val === 'Bar'
      }
    },
    data: {
      type: Object
    },
    options: {
      type: Object
    },
    responsive: {
      type: Array
    },
    events: {
      type: Object
    }
  },

  mounted () {
    this.draw()
  },

  data () {
    return {
      error: {
        onError: false,
        message: ''
      },
      noData: '',
      message: ''
    }
  },

  methods: {
    draw () {
      if (this.data) {
        // data is empty
        if (this.data.series.length < 1 || (this.type !== 'Pie' && this.data.labels.length < 1)) {
          // clear the potential old chart
          /* eslint no-new:0 */
          new Chartist[this.type](this.$el, this.data, this.options, this.responsive)
          this.setNoData()
        // data is defined
        } else {
          this.noData = '' // remove class ct-nodata
          this.message = '' // remove message no data
          // clear error
          if (this.error.onError) this.error = { onError: false, message: '' }
          const chart = new Chartist[this.type](this.$el, this.data, this.options, this.responsive)
          if (this.events) {
            Object.keys(this.events).forEach(key => {
              chart.on(key, this.events[key])
            })
          }
        }
      } else {
        this.setNoData()
      }
    },
    setNoData () {
      this.error = {
        onError: true,
        message: ''
      }
      this.noData = 'ct-nodata'
      this.message = this.error.message
    }
  },

  watch: {
    ratio: 'draw',
    options: 'draw',
    data: {
      handler: 'draw',
      deep: true
    },
    type: 'draw'
  }
}
</script>

<style src="chartist/dist/chartist.css"></style>
