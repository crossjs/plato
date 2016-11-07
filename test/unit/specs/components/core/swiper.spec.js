import Vue from 'vue'
import CSwiper from 'components/core/swiper'

describe('swiper.vue', () => {
  let el
  let vm

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
    // sinon.stub(console, 'error')
  })

  afterEach(() => {
    // document.body.removeChild(el)
    vm.$destroy()
    // console.error.restore()
  })

  it('should render correct contents', done => {
    vm = new Vue({
      el,
      template: `<c-swiper>
          <div class="c-swiper-content"></div>
        </c-swiper>`,
      components: {
        CSwiper
      }
    })

    vm.$nextTick(() => {
      assert(vm.$el.querySelector('.c-swiper-left'))
      assert(vm.$el.querySelector('.c-swiper-content'))
      assert(vm.$el.querySelector('.c-swiper-right'))
      done()
    })
  })

  it('swipe left', done => {
    vm = new Vue({
      el,
      template: `<c-swiper>
          <div slot="left">left</div>
          content
          <div slot="right">right</div>
        </c-swiper>`,
      components: {
        CSwiper
      }
    })

    vm.$nextTick(() => {
      triggerTouchEvents(vm.$el, 'touchstart', e => {
        e.touches = [{
          pageX: 0,
          pageY: 0
        }]
      })
      triggerTouchEvents(vm.$el, 'touchmove', e => {
        e.touches = [{
          pageX: -window.innerWidth,
          pageY: 0
        }]
      })
      triggerTouchEvents(vm.$el, 'touchend')

      setTimeout(() => {
        expect(vm.$el.style.webkitTransform).to.equal('translate3d(-' + vm.$el.querySelector('.c-swiper-right').clientWidth + 'px, 0, 0)')
        done()
      }, 250)
    })
  })

  it('swipe right', done => {
    vm = new Vue({
      el,
      template: `<c-swiper>
          <div slot="left">left</div>
          content
          <div slot="right">right</div>
        </c-swiper>`,
      components: {
        CSwiper
      }
    })

    vm.$nextTick(() => {
      triggerTouchEvents(vm.$el, 'touchstart', e => {
        e.touches = [{
          pageX: 0,
          pageY: 0
        }]
      })
      triggerTouchEvents(vm.$el, 'touchmove', e => {
        e.touches = [{
          pageX: window.innerWidth,
          pageY: 0
        }]
      })
      triggerTouchEvents(vm.$el, 'touchend')

      setTimeout(() => {
        expect(vm.$el.style.webkitTransform).to.equal('translate3d(' + vm.$el.querySelector('.c-swiper-left').clientWidth + 'px, 0, 0)')
        done()
      }, 250)
    })
  })
})
