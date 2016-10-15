import Vue from 'vue'
import CRange from 'components/c-range'

describe('range.vue', () => {
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
      template: '<c-range></c-range>',
      components: {
        CRange
      }
    })

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.c-range-content').style.paddingLeft).to.equal('0px')
      done()
    })
  })

  it('value', done => {
    vm = new Vue({
      el,
      template: `<c-range
        :value="value"></c-range>`,
      data: {
        value: 50
      },
      components: {
        CRange
      }
    })

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.c-range-content').clientWidth).to.equal(window.innerWidth)
      expect(vm.$el.querySelector('.c-range-content').style.paddingLeft).to.equal(window.innerWidth / 2 + 'px')
      done()
    })
  })

  it('touch', done => {
    vm = new Vue({
      el,
      template: `<c-range
        :value="value"
        @change="change"></c-range>`,
      data: {
        value: 50
      },
      methods: {
        change (value) {
          expect(value).to.equal(51)
          this.value = value
          done()
        }
      },
      components: {
        CRange
      }
    })

    triggerTouchEvents(vm.$el, 'touchstart', e => {
      e.touches = [{
        pageX: 0,
        pageY: 0
      }]
    })
    triggerTouchEvents(vm.$el, 'touchmove', e => {
      e.touches = [{
        pageX: window.innerWidth / 100,
        pageY: 0
      }]
    })
    triggerTouchEvents(vm.$el, 'touchend')
  })

  it('step', done => {
    vm = new Vue({
      el,
      template: `<c-range
        :value="value"
        :step="step"
        @change="change"></c-range>`,
      data: {
        value: 50,
        step: 10
      },
      methods: {
        change (value) {
          expect(value).to.equal(60)
          this.value = value
          done()
        }
      },
      components: {
        CRange
      }
    })

    triggerTouchEvents(vm.$el, 'touchstart', e => {
      e.touches = [{
        pageX: 0,
        pageY: 0
      }]
    })
    triggerTouchEvents(vm.$el, 'touchmove', e => {
      e.touches = [{
        pageX: window.innerWidth / 100,
        pageY: 0
      }]
    })
    triggerTouchEvents(vm.$el, 'touchend')

    triggerTouchEvents(vm.$el, 'touchstart', e => {
      e.touches = [{
        pageX: 0,
        pageY: 0
      }]
    })
    triggerTouchEvents(vm.$el, 'touchmove', e => {
      e.touches = [{
        pageX: window.innerWidth / 10,
        pageY: 0
      }]
    })
    triggerTouchEvents(vm.$el, 'touchend')
  })
})
