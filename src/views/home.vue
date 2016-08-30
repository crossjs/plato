<template>
  <div class="v-home">
    <c-pane>
      <c-loading v-show="faq_items_pending"></c-loading>
      <c-cell v-for="item in faq_items" :key="item.id">
        <h3>{{ item.title }}</h3>
        <article>{{ item.content }}</article>
        <c-button @click.native="deleteItem(item.id)">Del</c-button>
      </c-cell>
    </c-pane>
  </div>
</template>

<script>
import CPane from 'plato-components/c-pane'
import CLoading from 'plato-components/c-loading'
import CCell from 'plato-components/c-cell'
import CButton from 'plato-components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['faq_items', 'faq_items_pending']),

  methods: mapActions(['getItems', 'addItem', 'deleteItem']),

  created () {
    this.getItems()
  },

  components: {
    CPane,
    CLoading,
    CCell,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
