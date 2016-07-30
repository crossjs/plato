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
        <small class="date">@ {{datetime(record.commit.author.date, 'yyyy-MM-dd hh:mm').format()}}</small>
      </c-cell>
    </c-pane>
    <c-pane>
      <c-group
        v-for="demo in demos"
        :title="__(demo.title)"
        :cells="demo.cells"
        :items="demo.items"></c-group>
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
      hello: 'Bello'
    }
  },

  computed: {
    ...mapGetters(['lang', 'commits', 'stars', 'forks']),
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
      const { $router } = this
      return [{
        title: 'view.home.example',
        cells: [{
          icon: 'chart',
          label: 'chart',
          value: this.__('view.home.charts'),
          click () {
            $router.push('demo/chart')
          },
          extra: {
            isLink: true
          }
        }, {
          value: `<i>${this.__('view.home.misc')}</i>`,
          click () {
            $router.push('demo/misc')
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
          label: 'Home',
          value: 'github.com/crossjs/plato',
          click () {
            window.open('https://github.com/crossjs/plato')
          }
        }, {
          icon: 'demo',
          label: 'Stat',
          value: `Stars(${this.stars}) Forks(${this.forks})`
        }]
      }]
    }
  },

  methods: {
    ...mapActions(['setEnv', 'getCommits', 'getRepository']),
    datetime
  },

  created () {
    // only fetch while no cached
    if (!this.commits) {
      this.getCommits()
    }
    if (!this.stars && !this.forks) {
      this.getRepository()
    }
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
