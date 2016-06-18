import Vue from 'vue'
import I18n from 'plugins/i18n'

Vue.use(I18n)

describe('plugins/i18n', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    document.body.removeChild(el)
  })

  const fragment = `
    <div>{{__(\'a\')}}</div>
    <div>{{__(\'b.c\')}}</div>
    <div>{{__(\'b.not.exist\')}}</div>
    <div>{{__(\'totally.not.exist\')}}</div>
    <div>{{__(\'\')}}</div>
    <div>{{__('b.d', { a: 'foo' })}}</div>
    <div>{{__('b.e', ['bar'])}}</div>
  `

  const resources = {
    a: 'A',
    b: {
      c: 'BC',
      d: 'v{a}r',
      e: 'v{0}r'
    }
  }

  const resources2 = {
    a: 'Alpha',
    b: {
      c: 'Before Century',
      not: {
        exist: 'Exist'
      }
    },
    totally: {
      not: {
        exist: 'Totally Exist'
      }
    }
  }

  it('should translate correctly', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: fragment,
      i18n: {
        resources
      }
    })

    const { children } = vm.$el

    expect(children[0].textContent).to.equal('A')
    expect(children[1].textContent).to.equal('BC')
    expect(children[2].textContent).to.equal('b.not.exist')
    expect(children[3].textContent).to.equal('totally.not.exist')
    expect(children[4].textContent).to.equal('')
    expect(children[5].textContent).to.equal('vfoor')
    expect(children[6].textContent).to.equal('vbarr')
  })

  it('should update translate correctly', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: fragment,
      i18n: {
        resources
      }
    })

    vm.$i18n.resources = resources2

    vm.$nextTick(() => {
      const { children } = vm.$el
      expect(children[0].textContent).to.equal('Alpha')
      expect(children[1].textContent).to.equal('Before Century')
      expect(children[2].textContent).to.equal('Exist')
      expect(children[3].textContent).to.equal('Totally Exist')
      done()
    })
  })

  describe('child component', () => {
    it('should translate correctly', () => {
      Vue.component('comp', {
        template: `<div>${fragment}</div>`
      })

      const vm = new Vue({
        el,
        replace: false,
        template: '<comp></comp>',
        i18n: {
          resources
        }
      })

      const { children } = vm.$children[0].$el

      expect(children[0].textContent).to.equal('A')
      expect(children[1].textContent).to.equal('BC')
      expect(children[2].textContent).to.equal('b.not.exist')
      expect(children[3].textContent).to.equal('totally.not.exist')
      expect(children[4].textContent).to.equal('')
    })

    it('should update translate correctly', done => {
      Vue.component('comp', {
        template: `<div>${fragment}</div>`
      })

      const vm = new Vue({
        el,
        replace: false,
        template: '<comp></comp>',
        i18n: {
          resources
        }
      })

      vm.$i18n.resources = resources2

      vm.$nextTick(() => {
        const { children } = vm.$children[0].$el
        expect(children[0].textContent).to.equal('Alpha')
        expect(children[1].textContent).to.equal('Before Century')
        expect(children[2].textContent).to.equal('Exist')
        expect(children[3].textContent).to.equal('Totally Exist')
        done()
      })
    })
  })
})
