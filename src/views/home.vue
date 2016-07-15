<template>
  <div class="demos">
    <c-pane>
      <c-form
        :cells="cells"
        :items="{lang: lang}"
        @mutate="setEnv"></c-form>
    </c-pane>
    <c-pane class="quatation">
      {{ __('message.plato', [hello]) }}
    </c-pane>
    <c-pane>
      <c-title>{{ __('view.home.latest_commits') }}</c-title>
      <c-loading v-show="!commits"></c-loading>
      <c-cell v-for="record in commits" transition="fade">
        <a :href="record.html_url" target="_blank" class="commit">{{record.commit.message}}</a><br>
        <small class="date">@ {{record.commit.author.date | datetime 'yyyy-MM-dd hh:mm'}}</small>
      </c-cell>
    </c-pane>
    <c-pane>
      <c-group
        v-for="demo in demos"
        :title="__(demo.title)"
        :cells="demo.cells"
        :items="demo.items"></c-group>
    </c-pane>
    <c-title>User Agent</c-title>
    <c-pane>
      <c-cell @click=""></c-cell>
      {{ua}}
    </c-pane>
  </div>
</template>

<script>
import datetime from 'nd-datetime'
import CForm from 'plato-components/c-form'
import CPane from 'plato-components/c-pane'
import CGroup from 'plato-components/c-group'
import CTitle from 'plato-components/c-title'
import CLoading from 'plato-components/c-loading'
import CCell from 'plato-components/c-cell'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      ua: navigator.userAgent,
      hello: 'Bello'
    }
  },

  computed: {
    ...mapGetters(['lang', 'commits']),
    cells () {
      return {
        lang: {
          label: this.__('view.home.language'),
          type: 'dropdown',
          extra: {
            options: [{
              value: 'en',
              label: 'English'
            }, {
              value: 'zh',
              label: '中文'
            }, {
              value: 'ar',
              label: 'لعربية'
            }, {
              value: 'none',
              label: '不存在的语言'
            }]
          }
        }
      }
    },
    demos () {
      const { router } = this.$route
      return [{
        title: 'view.home.example',
        cells: [{
          label: 'form',
          value: this.__('view.home.form'),
          click () {
            router.go('demo/form')
          },
          extra: {
            isLink: true
          }
        }, {
          icon: 'chart',
          label: 'chart',
          value: this.__('view.home.charts'),
          click () {
            router.go('demo/chart')
          },
          extra: {
            isLink: true
          }
        }, {
          value: `<i>${this.__('view.home.misc')}</i>`,
          click () {
            router.go('demo/misc')
          },
          extra: {
            isLink: true,
            isHTML: true
          }
        }]
      }, {
        title: 'view.home.about',
        cells: [{
          icon: 'github',
          label: 'Fork',
          value: 'github.com/crossjs/plato',
          click () {
            window.open('https://github.com/crossjs/plato')
          }
        }, {
          icon: 'demo',
          label: 'Author',
          value: 'github.com/crossjs',
          click () {
            window.open('https://github.com/crossjs')
          }
        }]
      }]
    }
  },

  methods: mapActions(['setEnv', 'getCommits']),

  ready () {
    // only fetch while no cached
    if (!this.commits) {
      this.getCommits()
    }
  },

  filters: {
    datetime
  },

  components: {
    CForm,
    CPane,
    CGroup,
    CTitle,
    CLoading,
    CCell
  }
}
</script>

<style src="styles/views/home"></style>
