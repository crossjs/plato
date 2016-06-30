<template>
  <div class="demo-chart">
    <pane>
      <chartist
        v-for="chart of charts"
        :ratio="chart.ratio"
        :type="chart.type"
        :data="chart.data"
        :options="chart.options"
        :responsive="chart.responsive"
        :events="chart.events"></chartist>
    </pane>
  </div>
</template>

<script>
import { Svg } from 'chartist'
import Pane from 'plato-components/c-pane'
import Chartist from './c-chartist'
export default {
  data () {
    return {
      charts: [{
        type: 'Line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          series: [
            [1, 5, 2, 5, 4, 3],
            [2, 3, 4, 8, 1, 2],
            [5, 4, 3, 2, 1, 0.5]
          ]
        },
        options: {
          // lineSmooth: Interpolation.step(),
          axisX: {
            labelInterpolationFnc (value) {
              return 'W ' + value
            }
          }
        },
        events: {
          draw (data) {
            if (data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 2000 * data.index,
                  dur: 2000,
                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                  to: data.path.clone().stringify(),
                  easing: Svg.Easing.easeOutQuint
                }
              })
            }
          }
        }
      }, {
        type: 'Bar',
        data: {
          labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
          series: [
            [60000, 40000, 80000, 70000],
            [40000, 30000, 70000, 65000],
            [8000, 3000, 10000, 6000]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            offset: 60
          },
          axisY: {
            offset: 80,
            labelInterpolationFnc (value) {
              return value + ' CHF'
            },
            scaleMinSpace: 15
          }
        }
      }, {
        // ratio: 'ct-square',
        type: 'Pie',
        data: {
          series: [20, 10, 30, 40]
        },
        options: {
          // todo: store env params in global
          width: document.documentElement.clientWidth - 32,
          height: document.documentElement.clientWidth - 32,
          labelInterpolationFnc (value) {
            return value + '%'
          }
        }
      }]
    }
  },

  components: {
    Pane,
    Chartist
  }
}
</script>
