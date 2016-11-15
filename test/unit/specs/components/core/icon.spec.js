import Vue from 'vue'
import CIcon from 'components/core/icon'
import entities from 'components/core/assets/icon-entities'

describe('icon.vue', () => {
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

  it('should render correct contents', () => {
    vm = new Vue({
      el,
      template: '<c-icon>PLATO</c-icon>',
      components: {
        CIcon
      }
    })

    expect(vm.$children.length).to.equal(1)
    expect(vm.$children[0].$el.textContent).to.equal(' ')
  })

  it('should render correct contents 2', () => {
    vm = new Vue({
      el,
      template: '<c-icon>eye</c-icon>',
      components: {
        CIcon
      }
    })

    expect(vm.$children.length).to.equal(1)
    expect(vm.$children[0].$el.textContent).to.equal(String.fromCharCode(parseInt(entities.eye.replace(/[^0-9a-f]/ig, ''), 16)))
  })

  it('should render correct contents after update', done => {
    vm = new Vue({
      el,
      template: '<c-icon>{{icon}}</c-icon>',
      components: {
        CIcon
      },
      data: {
        icon: 'PLATO'
      }
    })

    expect(vm.$children.length).to.equal(1)
    expect(vm.$children[0].$el.textContent).to.equal(' ')

    vm.icon = 'eye'

    vm.$nextTick(() => {
      expect(vm.$children.length).to.equal(1)
      expect(vm.$children[0].$el.textContent).to.equal(String.fromCharCode(parseInt(entities.eye.replace(/[^0-9a-f]/ig, ''), 16)))
      done()
    })
  })
})
