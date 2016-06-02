import Vue from 'vue'
import Toast from 'components/c-toast'

describe('toast.vue', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
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
      el: '#el',
      template: `<div>
          <toast
            cls="toast"
            :transition="transition"
            :toasts="toasts"
            @remove="_remove"></toast>
        </div>`,
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
