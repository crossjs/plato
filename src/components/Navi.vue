<template>
  <nav>
    <a v-link="{ path: '/', exact: true }">home</a>
    <a v-link="{ path: '/about' }">about</a>
    <a v-link="{ path: '/users' }">users</a>
    <a v-link="{ path: '/profile' }">profile</a>
    <a v-link="{ path: '/signup' }">signup</a>
    <a v-link="{ path: '/login' }">login</a>
    <a v-link="{ path: '/logout' }">logout</a>
  </nav>
</template>

<script>
</script>

<style>
.v-link-active {
  color: red;
}
</style>
