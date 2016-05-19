import Vue from 'vue'
import Toast from 'solo/c-toast'
import { trigger } from '../../utils'

describe('toast.vue', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
  })
  it('should render correct contents', done => {
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

    const vmToast = vm.$children[0]

    expect(vmToast.$el.children.length).to.equal(2)
    // button
    trigger(vmToast.$el.children[0].children[0], 'click')

    vmToast.$nextTick(() => {
      vmToast.$nextTick(() => {
        expect(vmToast.$el.children.length).to.equal(1)
        done()
      })
    })
  })
})
