<template>
  <div class="c-route">
    <ul>
      <li v-for="(route, index) in routes" :key="index">
        <router-link class="c-route-link"
          :to="father + route.path"
          :exact="route.exact">
          <c-icon v-if="route.icon"
            :value="route.icon"></c-icon>
          {{__(route.title)}}
        </router-link>
        <c-route v-if="route.children"
          :father="route.path"
          :routes="route.children"></c-route>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'c-route',
  props: {
    father: {
      type: String,
      default: ''
    },
    routes: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
