<template>
  <nav class="navi">
    <a v-for="link in links" v-link="{ path: link.path, name: link.name, exact: link.exact }" class="iconfont iconfont-{{link.icon}}">{{link.title}}</a>
  </nav>
</template>

<script>
import routes from 'routes'
import { bearer } from 'vx/getters'
export default {
  computed: {
    links () {
      if (this.bearer) {
        return walkRoutes(route => !route.skip && !!route.auth)
      } else {
        return walkRoutes(route => !route.skip && !route.auth)
      }
    }
  },

  vuex: {
    getters: {
      bearer
    }
  }
}

function walkRoutes (reducer) {
  if (!reducer) {
    reducer = () => {
      return true
    }
  }

  return Object.keys(routes)
    .filter(key => reducer(routes[key]))
    .map(key => {
      return {
        path: key,
        name: routes[key].name,
        exact: routes[key].exact,
        icon: routes[key].icon,
        title: routes[key].title
      }
    })
}
</script>

<style src="styles/components/navi"></style>
