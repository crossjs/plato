<template>
  <div class="v-home">
    <c-modal
      :show="show_modal"
      @cancel="callback('cancel')"
      @submit="callback('submit')"
      @close="show_modal = false">{{ __('views.home.confirm') }}</c-modal>
    <c-spinner v-show="faq_is_fetching"></c-spinner>
    <c-row :flex="false" v-for="item in faq_items" :key="item.id">
      <h3>{{ item.title }}</h3>
      <article>{{ item.content }}</article>
      <c-button size="xsmall" @click.native="_delete(item.objectId)">{{ __('views.home.delete') }}</c-button>
    </c-row>
  </div>
</template>

<script>
import CModal from 'components/c-modal'
import CSpinner from 'components/c-spinner'
import CRow from 'components/c-row'
import CButton from 'components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show_modal: false
    }
  },

  computed: mapGetters(['faq_items', 'faq_is_fetching']),

  methods: {
    _delete (id) {
      this.id = id
      this.show_modal = true
    },
    callback (key) {
      this.show_modal = false
      if (key === 'submit') {
        this.deleteItem(this.id)
      }
      delete this.id
    },
    ...mapActions(['getItems', 'addItem', 'deleteItem'])
  },

  created () {
    this.getItems()
  },

  components: {
    CModal,
    CSpinner,
    CRow,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
