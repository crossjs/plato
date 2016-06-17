import Vue from 'vue'
import Toast from 'components/c-toast'

describe('toast.vue', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<toast></toast>',
      components: {
        Toast
      }
    })

    expect(vm.$children[0].$el.children.length).to.equal(0)
  })

  it('should render correct contents 2', () => {
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
      template: '<toast :toasts="toasts"></toast>',
      data: {
        toasts
      },
      components: {
        Toast
      }
    })

    expect(vm.$children[0].$el.children.length).to.equal(2)
  })
})
