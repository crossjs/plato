<template>
  <div class="v-home">
    <c-modal
      :show="show_modal"
      @cancel="callback('cancel')"
      @submit="callback('submit')"
      @close="show_modal = false">{{ __('views.home.confirm') }}</c-modal>
    <c-scroller
      :height="height"
      :loading="faq_is_fetching"
      :drained="drained"
      @pulldown="getItems">
      <c-row :flex="false" v-for="item in faq_items" :key="item.id">
        <h3>{{ item.title }}</h3>
        <article>{{ item.content }}</article>
        <c-button v-if="authorized" size="xsmall" v-tap @tap.native="_delete(item.objectId)">{{ __('views.home.delete') }}</c-button>
      </c-row>
    </c-scroller>
  </div>
</template>

<script>
import CModal from 'components/c-modal'
import CScroller from 'components/c-scroller'
import CSpinner from 'components/c-spinner'
import CRow from 'components/c-row'
import CButton from 'components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show_modal: false,
      drained: true,
      height: 0
    }
  },

  computed: mapGetters(['authorized', 'faq_items', 'faq_is_fetching']),

  created () {
    this.getItems()
  },

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight
    this.addToast('pull down to reload')
  },

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
    ...mapActions(['getItems', 'addItem', 'deleteItem', 'addToast'])
  },

  components: {
    CModal,
    CScroller,
    CSpinner,
    CRow,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
