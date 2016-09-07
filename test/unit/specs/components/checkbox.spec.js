import Vue from 'vue'
import CCheckbox from 'components/c-checkbox'

describe('checkbox.vue', () => {
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

  it('should NOT have label', () => {
    vm = new Vue({
      el,
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
    vm = new Vue({
      el,
      template: '<c-checkbox :value="value" :extra="extra" @mutate="mutate"></c-checkbox>',
      data: {
        extra: {
          'true-label': 'TRUE',
          'false-label': 'FALSE'
        },
        value: false
      },
      methods: {
        mutate (value) {
          this.value = value
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
    vm = new Vue({
      el,
      template: '<c-checkbox :value="value" @mutate="mutate"></c-checkbox>',
      data: {
        value: false
      },
      methods: {
        mutate (value) {
          this.value = value
        }
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
    vm = new Vue({
      el,
      template: '<c-checkbox :value="value" @mutate="mutate"></c-checkbox>',
      data: {
        value: true
      },
      methods: {
        mutate (value) {
          this.value = value
        }
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
    vm = new Vue({
      el,
      template: '<c-checkbox :value="value" :extra="extra" @mutate="mutate"></c-checkbox>',
      data: {
        extra: {
          'true-value': 'TRUE',
          'false-value': 'FALSE'
        },
        value: 'FALSE'
      },
      methods: {
        mutate (value) {
          this.value = value
        }
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
