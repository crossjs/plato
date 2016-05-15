<template>
  <ul>
    <li v-for="route in _routes">
      <a
        :class="{
          ['iconfont-' + route.icon]: route.icon
        }"
        v-link="{
          path: father + route.path,
          name: route.name,
          exact: route.exact
        }">{{route.title}}</a>
      <template v-if="recursive && route.subRoutes">
        <route
          :father="route.path"
          :filter="filter"
          :routes="route.subRoutes"></route>
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'route',
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
      default: {}
    },
    filter: {
      type: [Function, Object],
      default: null
    }
  },

  computed: {
    _routes () {
      return walkRoutes(this.routes, this.filter)
    }
  }
}

function walkRoutes (routes, filter) {
  let keys = Object.keys(routes)

  keys = keys.filter(key => !routes[key].hidden)

  if (filter) {
    keys = keys.filter(key => filter(key, routes[key]))
  }

  return keys.map(key => {
    const route = routes[key]
    return {
      path: route.path || key,
      name: route.name,
      exact: route.exact,
      icon: route.icon,
      title: route.title,
      subRoutes: route.subRoutes
    }
  })
}

</script>
