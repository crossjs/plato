<template>
  <div class="v-misc">
    <c-pane style="background-color:gray">it's pane</c-pane>
    <c-modal :show="showModal" @close="showModal = false">showModal</c-modal>
    <c-modal :show="showSheet" :actions="{}" @close="showSheet = false">
      <c-cell direction="row">
        <c-button>Action 1</c-button>
      </c-cell>
      <c-cell direction="row">
        <c-button>Action 2</c-button>
      </c-cell>
    </c-modal>
    <c-pane>
      <c-cell direction="column" style="height:100px">
        <c-flex align="center" @click.native="showModal=true">Show Modal</c-flex>
        <c-flex align="center" @click.native="showSheet=true">Show sheet-like Modal</c-flex>
      </c-cell>
    </c-pane>
    <c-image class="img1" src="images/logo.png"></c-image>
    <c-pane>
      <c-chartist
        v-for="(chart, index) of charts"
        :key="index"
        :ratio="chart.ratio"
        :type="chart.type"
        :data="chart.data"
        :options="chart.options"
        :responsive="chart.responsive"
        :events="chart.events"></c-chartist>
    </c-pane>
  </div>
</template>

<script>
import { Svg } from 'chartist'
import CImage from 'plato-components/c-image'
import CButton from 'plato-components/c-button'
import CPane from 'plato-components/c-pane'
import CCell from 'plato-components/c-cell'
import CFlex from 'plato-components/c-flex'
import CModal from 'plato-components/c-modal'
import CChartist from 'components/c-chartist'
export default {
  data () {
    return {
      model1: {
        label: 'Label',
        value: true
      },
      model2: {
        label: 'Label',
        value: 1
      },
      showModal: false,
      showSheet: false,
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
    CImage,
    CButton,
    CPane,
    CCell,
    CFlex,
    CModal,
    CChartist
  }
}
</script>
