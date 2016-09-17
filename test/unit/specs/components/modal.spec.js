import Vue from 'vue'
import CModal from 'components/c-modal'

describe('modal.vue', () => {
  let el
  let vm

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    // document.body.removeChild(el)
    vm.$destroy()
  })

  it('should show/hide modal', done => {
    vm = new Vue({
      el,
      template: '<c-modal :show="show">hello?</c-modal>',
      data: {
        show: false
      },
      components: {
        CModal
      }
    })

    const { style } = vm.$children[0].$el

    expect(style.display).to.equal('none')

    vm.show = true
    vm.$nextTick(() => {
      expect(style.display).to.equal('')

      // vm.show = false
      // vm.$nextTick(() => {
      //   expect(style.display).to.equal('none')
      //   done()
      // })
      done()
    })
  })

  it('should render correct contents', done => {
    vm = new Vue({
      el,
      template: `<c-modal
        :show="show"
        @cancel="callback">hello?</c-modal>`,
      data: {
        show: true
      },
      methods: {
        callback (key) {
          expect(vm.show).to.be.ok
          vm.show = false
          vm.$nextTick(() => {
            expect(vm.show).to.be.not.ok
            done()
          })
        }
      },
      components: {
        CModal
      }
    })

    const modal = vm.$children[0]

    // only .content
    expect(modal.$el.children.length).to.equal(1)
    expect(modal.$el.querySelector('.c-modal-body').textContent).to.equal('hello?')

    // button
    triggerMouseEvents(modal.$el.querySelector('a:first-child'), 'click')
  })

  it('should NOT prevent close', done => {
    vm = new Vue({
      el,
      template: `<c-modal
        :show="show"
        @cancel="callback">hello?</c-modal>`,
      data: {
        show: true
      },
      methods: {
        callback () {
          expect(vm.show).to.be.ok
          vm.show = false
          vm.$nextTick(() => {
            expect(vm.show).to.be.not.ok
            done()
          })
          return false
        }
      },
      components: {
        CModal
      }
    })

    const modal = vm.$children[0]

    // button
    triggerMouseEvents(modal.$el.querySelector('a:first-child'), 'click')
  })
})
