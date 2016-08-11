<template>
  <div class="v-home">
    <c-pane>
      <c-loading v-show="loading"></c-loading>
      <c-cell v-for="item in items" :key="item.id">
        {{ item }}
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { PROMISE_PENDING } from 'store/constants'

export default {
  computed: {
    ...mapGetters(['items']),
    ...mapState({
      loading (state) {
        return state.faq.meta === PROMISE_PENDING
      }
    })
  },

  methods: {
    ...mapActions(['getItems', 'addItem', 'deleteItem']),
    add () {
      this.addItem({
        title: 'first question',
        content: 'no answers yet'
      })
    }
  },

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
