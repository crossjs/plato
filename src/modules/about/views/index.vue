<template>
  <c-pane>
    <br>
    <br>
    <p class="center">
      <img src="https://cdn.rawgit.com/platojs/plato/master/src/assets/logo.svg" alt="PLATO"><br>
      <sub>Based on Vue 2.0</sub>
    </p>
    <p class="badges center">
      <a href="https://travis-ci.org/platojs/plato"><img src="https://img.shields.io/travis/platojs/plato.svg?style=flat-square" alt="Travis"></a>
      <a href="https://coveralls.io/github/platojs/plato"><img src="https://img.shields.io/coveralls/platojs/plato.svg?style=flat-square" alt="Coveralls"></a>
      <a href="https://david-dm.org/platojs/plato"><img src="https://david-dm.org/platojs/plato.svg?style=flat-square" alt="dependencies"></a>
      <a href="https://david-dm.org/platojs/plato?type=dev"><img src="https://david-dm.org/platojs/plato/dev-status.svg?style=flat-square" alt="devDependency Status"></a>
    </p>
    <p class="center">
      Check out <a href="https://github.com/platojs/plato"><b>{{ __('source') }}</b></a> on Github
    </p>
  </c-pane>
</template>

<script>
import CPane from 'platojs/components/core/pane'

export default {
  components: {
    CPane
  }
}
</script>

<style src="../styles/index" scoped></style>
