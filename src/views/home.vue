<template>
  <div class="demos">
    <c-pane>
      <c-form
        :cells="cells"
        :items="{lang: env.lang}"
        @mutate="setEnv"></c-form>
    </c-pane>
    <c-pane class="quatation">
      {{__('message.plato')}}
    </c-pane>
    <c-pane>
      <c-group
        v-for="demo in demos"
        :title="demo.title"
        :cells="demo.cells"
        :items="demo.items"></c-group>
    </c-pane>
  </div>
</template>

<script>
import CForm from 'components/c-form'
import CPane from 'components/c-pane'
import CGroup from 'components/c-group'
import { setEnv } from 'vx/actions'
export default {
  data () {
    const { router } = this.$route
    return {
      cells: {
        lang: {
          label: '语言',
          type: 'dropdown',
          extra: {
            options: [{
              value: 'en',
              label: 'English'
            }, {
              value: 'zh',
              label: '中文'
            }]
          }
        }
      },
      demos: [{
        title: '示例',
        cells: [{
          icon: 'iconfont-solo',
          label: 'form',
          value: '一些表单组件',
          click () {
            router.go('demo/form')
          },
          extra: {
            isLink: true
          }
        }, {
          icon: 'iconfont-chart',
          label: 'chart',
          value: '一些图表',
          click () {
            router.go('demo/chart')
          },
          extra: {
            isLink: true
          }
        }, {
          icon: 'iconfont-duo',
          value: '<i>杂七杂八</i>',
          click () {
            router.go('demo/misc')
          },
          extra: {
            isLink: true,
            isHTML: true
          }
        }]
      }, {
        title: '关于',
        cells: [{
          icon: 'iconfont-github',
          label: 'Fork',
          value: 'github.com/crossjs/plato',
          click () {
            window.open('https://github.com/crossjs/plato')
          }
        }, {
          icon: 'iconfont-demo',
          label: 'Author',
          value: 'github.com/crossjs',
          click () {
            window.open('https://github.com/crossjs')
          }
        }]
      }]
    }
  },

  vuex: {
    actions: {
      setEnv
    }
  },

  components: {
    CForm,
    CPane,
    CGroup
  }
}
</script>

<style src="styles/views/home"></style>
