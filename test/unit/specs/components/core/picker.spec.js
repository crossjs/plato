import Vue from 'vue'
import CPicker from 'components/core/picker'
import tap from 'application/directives/tap'

Vue.directive('tap', tap)

describe('picker.vue', () => {
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
      template: `<c-picker>
          <div style="height:100px"></div>
          <div style="height:100px"></div>
          <div style="height:100px"></div>
        </c-picker>`,
      components: {
        CPicker
      }
    })

    vm.$nextTick(() => {
      expect(vm.$el.style.height).to.equal('700px')
      expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 300px, 0)')
      done()
    })
  })

  it('should render correct contents (async)', done => {
    vm = new Vue({
      el,
      template: `<c-picker>
          <div v-if="ok" style="height:100px"></div>
          <div v-if="ok" style="height:100px"></div>
          <div v-if="ok" style="height:100px"></div>
        </c-picker>`,
      data: {
        ok: false
      },
      components: {
        CPicker
      }
    })

    expect(vm.$el.style.height).to.equal('0px')
    vm.ok = true
    vm.$nextTick(() => {
      expect(vm.$el.style.height).to.equal('700px')
      expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 300px, 0)')
      vm.ok = false
      vm.$nextTick(() => {
        expect(vm.$el.style.height).to.equal('0px')
        expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 0px, 0)')
        done()
      })
    })
  })

  it('size', done => {
    vm = new Vue({
      el,
      template: `<c-picker
        :size="size">
          <div style="height:100px"></div>
          <div style="height:100px"></div>
          <div style="height:100px"></div>
        </c-picker>`,
      data: {
        size: 3
      },
      components: {
        CPicker
      }
    })

    vm.$nextTick(() => {
      expect(vm.$el.style.height).to.equal('300px')
      expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 100px, 0)')
      vm.size = 5
      vm.$nextTick(() => {
        expect(vm.$el.style.height).to.equal('500px')
        expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 200px, 0)')
        vm.size = 3
        vm.$nextTick(() => {
          expect(vm.$el.style.height).to.equal('300px')
          expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 100px, 0)')
          done()
        })
      })
    })
  })

  it('index', done => {
    vm = new Vue({
      el,
      template: `<c-picker
        :index="index">
          <div style="height:100px"></div>
          <div style="height:100px"></div>
          <div style="height:100px"></div>
        </c-picker>`,
      data: {
        index: 1
      },
      components: {
        CPicker
      }
    })

    vm.$nextTick(() => {
      expect(vm.$el.style.height).to.equal('700px')
      expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 200px, 0)')
      vm.index = 0
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 300px, 0)')
        vm.index = 3
        // 3 -> 2
        vm.$nextTick(() => {
          expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 100px, 0)')
          done()
        })
      })
    })
  })

  it('touch', done => {
    vm = new Vue({
      el,
      template: `<c-picker
        @change="change">
          <div style="height:100px"></div>
          <div style="height:100px"></div>
          <div style="height:100px"></div>
        </c-picker>`,
      methods: {
        change (index) {
          expect(index).to.equal(1)
          done()
        }
      },
      components: {
        CPicker
      }
    })

    vm.$nextTick(() => {
      expect(vm.$el.style.height).to.equal('700px')
      expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 300px, 0)')

      triggerTouchEvents(vm.$el, 'touchstart', e => {
        e.touches = [{
          pageX: 0,
          pageY: 0
        }]
      })
      triggerTouchEvents(vm.$el, 'touchmove', e => {
        e.touches = [{
          pageX: 0,
          pageY: -100
        }]
      })
      triggerTouchEvents(vm.$el, 'touchend')
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.c-picker-content').style.webkitTransform).to.equal('translate3d(0, 200px, 0)')
      })
    })
  })
})
