<template>
  <c-pane>
    <br>
    <br>
    <p class="center">
      <img src="https://cdn.rawgit.com/crossjs/plato/master/src/assets/logo.svg" alt="PLATO"><br>
      <sub>Based on Vue 2.0</sub>
    </p>
    <p class="badges center">
      <a href="https://travis-ci.org/crossjs/plato"><img src="https://img.shields.io/travis/crossjs/plato.svg?style=flat-square" alt="Travis"></a>
      <a href="https://coveralls.io/github/crossjs/plato"><img src="https://img.shields.io/coveralls/crossjs/plato.svg?style=flat-square" alt="Coveralls"></a>
      <a href="https://david-dm.org/crossjs/plato"><img src="https://david-dm.org/crossjs/plato.svg?style=flat-square" alt="dependencies"></a>
      <a href="https://david-dm.org/crossjs/plato?type=dev"><img src="https://david-dm.org/crossjs/plato/dev-status.svg?style=flat-square" alt="devDependency Status"></a>
    </p>
    <p class="center">
      Check out <a href="https://github.com/crossjs/plato"><b>{{ __('source') }}</b></a> on Github
    </p>
  </c-pane>
</template>

<script>
import CPane from 'components/core/pane'

export default {
  components: {
    CPane
  }
}
</script>

<style src="../styles/index" scoped></style>
