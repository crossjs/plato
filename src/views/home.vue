<template>
  <div class="v-home">
    <c-modal
      :show="show_modal"
      @cancel="callback('cancel')"
      @submit="callback('submit')">{{ __('views.home.confirm') }}</c-modal>
    <c-scroller
      :transition="transition"
      :height="height"
      :loading="faq_is_fetching"
      :drained="drained"
      @pulldown="getItems">
      <c-row
        v-for="item in faq_items"
        :key="item.id"
        :flex="false">
        <c-swipe>
          <c-button
            slot="left"
            class="primary squared">{{ __('views.home.nothing') }}</c-button>
          <article class="padding">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </article>
          <c-button
            slot="right"
            v-if="authorized"
            class="warning squared"
            v-tap @tap.native="_delete(item.id)">{{ __('views.home.delete') }}</c-button>
        </c-swipe>
      </c-row>
    </c-scroller>
  </div>
</template>

<script>
import CModal from 'components/c-modal'
import CScroller from 'components/c-scroller'
import CSpinner from 'components/c-spinner'
import CRow from 'components/c-row'
import CSwipe from 'components/c-swipe'
import CButton from 'components/c-button'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show_modal: false,
      drained: true,
      height: 0,
      id: 0
    }
  },

  computed: mapGetters(['transition', 'authorized', 'faq_items', 'faq_is_fetching']),

  created () {
    this.getItems()
  },

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight
    this.addToast('Pull down to reload')
    this.addToast('Swipe left/right to show buttons')
  },

  methods: {
    _delete (id) {
      alert(id)
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
    CSwipe,
    CButton
  }
}
</script>

<style src="styles/views/home"></style>
