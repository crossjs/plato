<template>
  <div class="index">
    <c-modal
      :show="show_modal"
      @cancel="callback('cancel')"
      @submit="callback('submit')">{{ __('index.confirm') }}</c-modal>
    <c-scroller
      :transition="transition"
      :height="height"
      :loading="fetching"
      :drained="drained"
      @pulldown="faqList">
      <c-row
        v-for="item in items"
        :key="item.id"
        :flex="false">
        <c-swiper>
          <c-button
            slot="left"
            class="primary squared">{{ __('index.nothing') }}</c-button>
          <article class="padding">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </article>
          <c-button
            slot="right"
            v-if="authorized"
            class="warning squared"
            v-tap @tap.native="_delete(item.id)">{{ __('index.delete') }}</c-button>
        </c-swiper>
      </c-row>
    </c-scroller>
  </div>
</template>

<script>
import CModal from 'components/core/modal'
import CScroller from 'components/core/scroller'
import CSpinner from 'components/core/spinner'
import CRow from 'components/core/row'
import CSwiper from 'components/core/swiper'
import CButton from 'components/core/button'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show_modal: false,
      drained: true,
      height: 0,
      id: 0
    }
  },

  computed: {
    ...mapGetters(['authorized', 'transition']),
    ...mapState({
      items: ({ faq }) => faq.entities,
      fetching: ({ faq }) => faq.fetching
    })
  },

  created () {
    this.faqList()
  },

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight
    this.addToast('Pull down to reload')
    this.addToast('Swiper left/right to show buttons')
  },

  methods: {
    ...mapActions(['faqList', 'faqDelete', 'addToast']),
    _delete (id) {
      this.id = id
      this.show_modal = true
    },
    callback (key) {
      this.show_modal = false
      if (key === 'submit') {
        this.faqDelete(this.id)
      }
      delete this.id
    }
  },

  components: {
    CModal,
    CScroller,
    CSpinner,
    CRow,
    CSwiper,
    CButton
  }
}
</script>

<style src="../styles/index" scoped></style>
