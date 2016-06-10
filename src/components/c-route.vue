<template>
  <div class="c-route">
    <ul>
      <li v-for="route in _routes">
        <c-route-link :route="{
            link: {
              path: father + route.path,
              name: route.name,
              exact: route.exact
            },
            icon: route.icon,
            title: route.title
          }"></c-route-link>
        <template v-if="recursive && route.subRoutes">
          <c-route
            :father="route.path"
            :filter="filter"
            :routes="route.subRoutes"></c-route>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import CRouteLink from 'components/c-route-link'
export default {
  name: 'c-route',
  props: {
    recursive: {
      type: Boolean,
      default: true
    },
    father: {
      type: String,
      default: ''
    },
    routes: {
      type: Object,
      default () {
        return {}
      }
    },
    filter: {
      type: Function,
      default: val => val
    }
  },

  computed: {
    _routes () {
      return walkRoutes(this.routes, this.filter, this.__.bind(this))
    }
  },

  components: {
    CRouteLink
  }
}

function walkRoutes (routes, filter, __ = val => val) {
  return Object.keys(routes)
  .filter(key => !routes[key].hidden)
  .filter(key => filter(key, routes[key]))
  .map(key => {
    const route = routes[key]
    return {
      path: route.path || key,
      name: route.name,
      exact: route.exact,
      icon: route.icon,
      title: __(route.title),
      subRoutes: route.subRoutes
    }
  })
}
</script>
