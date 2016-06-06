import Vue from 'vue'
import I18n from 'plugins/i18n'

Vue.use(I18n)

describe('plugins/i18n', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(() => {
    document.body.removeChild(el)
  })

  it('should translate correctly', () => {
    const vm = new Vue({
      el,
      replace: false,
      template: `
          <div>{{__(\'a\')}}</div>
          <div>{{__(\'b.c\')}}</div>
          <div>{{__(\'b.not.exist\')}}</div>
          <div>{{__(\'totally.not.exist\')}}</div>
        `,
      i18n: {
        resources: {
          a: 'A',
          b: {
            c: 'BC'
          }
        }
      }
    })

    const { children } = vm.$el

    expect(children[0].textContent).to.equal('A')
    expect(children[1].textContent).to.equal('BC')
    expect(children[2].textContent).to.equal('b.not.exist')
    expect(children[3].textContent).to.equal('totally.not.exist')
  })

  it('should update translate correctly', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: `
          <div>{{__(\'a\')}}</div>
          <div>{{__(\'b.c\')}}</div>
          <div>{{__(\'b.not.exist\')}}</div>
          <div>{{__(\'totally.not.exist\')}}</div>
        `,
      i18n: {
        resources: {
          a: 'A',
          b: {
            c: 'BC'
          }
        }
      }
    })

    vm.$i18n.resources = {
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

    vm.$nextTick(() => {
      const { children } = vm.$el
      expect(children[0].textContent).to.equal('Alpha')
      expect(children[1].textContent).to.equal('Before Century')
      expect(children[2].textContent).to.equal('Exist')
      expect(children[3].textContent).to.equal('Totally Exist')
      done()
    })
  })
})
