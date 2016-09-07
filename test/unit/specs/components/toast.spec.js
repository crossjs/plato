import Vue from 'vue'
import CToast from 'components/c-toast'

describe('toast.vue', () => {
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

  it('should render correct contents', done => {
    vm = new Vue({
      el,
      template: '<c-toast :toasts="toasts"></c-toast>',
      data: {
        toasts: []
      },
      components: {
        CToast
      }
    })

    // there is a div for transition group
    expect(vm.$children[0].$el).to.equal(vm.$el)
    expect(vm.$children[0].$el.children.length).to.equal(1)
    expect(vm.$children[0].$el.children[0].nodeName).to.equal('DIV')

    vm.toasts = [
      { _id: 1, code: 'code', message: 'message' },
      { _id: 2, code: 'code', message: 'message' }
    ]

    vm.$nextTick(() => {
      expect(vm.$children[0].$el.children[0].children.length).to.equal(2)
      done()
    })
  })
})
