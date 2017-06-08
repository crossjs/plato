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
      @pulldown="list">
      <c-row
        v-for="item in entities"
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
import tap from 'platojs/directives/tap'
import CModal from 'platojs/components/core/modal'
import CScroller from 'platojs/components/core/scroller'
import CSpinner from 'platojs/components/core/spinner'
import CRow from 'platojs/components/core/row'
import CSwiper from 'platojs/components/core/swiper'
import CButton from 'platojs/components/core/button'

export default {
  data () {
    return {
      show_modal: false,
      drained: true,
      height: 0,
      id: 0
    }
  },

  mapState: ['entities', 'fetching'],
  mapGetters: [
    'core/authorized',
    'config/transition'
  ],
  mapActions: ['list', 'delete', 'config/addToast'],

  methods: {
    _delete (id) {
      this.id = id
      this.show_modal = true
    },
    callback (key) {
      this.show_modal = false
      if (key === 'submit') {
        this.delete(this.id)
      }
      delete this.id
    }
  },

  created () {
    this.list()
  },

  mounted () {
    this.height =
      document.documentElement.clientHeight -
      document.getElementById('header').clientHeight
    this.addToast('Pull down to reload')
    this.addToast('Swiper left/right to show buttons')
  },

  components: {
    CModal,
    CScroller,
    CSpinner,
    CRow,
    CSwiper,
    CButton
  },

  directives: {
    tap
  }
}
</script>

<style src="../styles/index" scoped></style>
