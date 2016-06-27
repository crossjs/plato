import Vue from 'vue'
import CCheckbox from 'components/c-checkbox'

describe('checkbox.vue', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  it('should NOT have label', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-checkbox></c-checkbox>',
      components: {
        CCheckbox
      }
    })

    expect(vm.$children.length).to.equal(1)
    const { children } = vm.$children[0].$el
    expect(children[0].tagName).to.equal('LABEL')
    expect(children[0].children.length).to.equal(1)
    expect(children[0].children[0].tagName).to.equal('INPUT')
  })

  it('should use true-label/false-label', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-checkbox :extra="extra"></c-checkbox>',
      data: {
        extra: {
          'true-label': 'TRUE',
          'false-label': 'FALSE'
        }
      },
      components: {
        CCheckbox
      }
    })

    expect(vm.$children.length).to.equal(1)
    const { children } = vm.$children[0].$el
    expect(children[0].tagName).to.equal('LABEL')
    expect(children[0].children.length).to.equal(2)
    expect(children[0].children[1].tagName).to.equal('INPUT')
    const span = children[0].children[0]
    expect(span.tagName).to.equal('SPAN')
    expect(span.textContent).to.equal('FALSE')

    triggerMouseEvents(vm.$children[0].$el.children[0], 'click')
    vm.$nextTick(() => {
      expect(span.textContent).to.equal('TRUE')
      done()
    })
  })

  it('should toggle value', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-checkbox :value.sync="value"></c-checkbox>',
      data: {
        value: false
      },
      components: {
        CCheckbox
      }
    })

    expect(vm.value).to.equal(false)

    triggerMouseEvents(vm.$children[0].$el.children[0], 'click')
    vm.$nextTick(() => {
      expect(vm.value).to.equal(true)
      done()
    })
  })

  it('should toggle value 2', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-checkbox :value.sync="value"></c-checkbox>',
      data: {
        value: true
      },
      components: {
        CCheckbox
      }
    })

    expect(vm.value).to.equal(true)

    triggerMouseEvents(vm.$children[0].$el.children[0], 'click')
    vm.$nextTick(() => {
      expect(vm.value).to.equal(false)
      done()
    })
  })

  it('should use true-value/false-value', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: '<c-checkbox :value.sync="value" :extra="extra"></c-checkbox>',
      data: {
        extra: {
          'true-value': 'TRUE',
          'false-value': 'FALSE'
        },
        value: 'FALSE'
      },
      components: {
        CCheckbox
      }
    })

    expect(vm.value).to.equal('FALSE')

    triggerMouseEvents(vm.$children[0].$el.children[0], 'click')
    vm.$nextTick(() => {
      expect(vm.value).to.equal('TRUE')
      done()
    })
  })
})
