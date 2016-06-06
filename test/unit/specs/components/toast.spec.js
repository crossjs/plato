import Vue from 'vue'
import Toast from 'components/c-toast'

describe('toast.vue', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', () => {
    const toasts = [{
      _id: 1,
      code: 'code1',
      message: 'message1'
    }, {
      _id: 2,
      code: 'code1',
      message: 'message1'
    }]
    const vm = new Vue({
      el,
      replace: false,
      template: `<toast
        class="toast"
        :transition="transition"
        :toasts="toasts"
        @remove="_remove"></toast>`,
      data: {
        toasts,
        transition: ''
      },
      methods: {
        _remove (toast) {
          toasts.$remove(toast)
        }
      },
      components: {
        Toast
      }
    })

    expect(vm.$children[0].$el.children.length).to.equal(2)
  })
})
