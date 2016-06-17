import Vue from 'vue'
import Modal from 'components/c-modal'

describe('modal.vue', () => {
  let el
  before(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  after(() => {
    document.body.removeChild(el)
  })

  it('should render correct contents', done => {
    const vm = new Vue({
      el,
      replace: false,
      template: `<modal
        :show.sync="show"
        :body="body"
        :callback="callback"></modal>`,
      data: {
        flag: 'a',
        show: true,
        body: 'hello?'
      },
      methods: {
        callback (key) {
          this.flag = 'b'
        }
      },
      components: {
        Modal
      }
    })

    const vmModal = vm.$children[0]

    expect(vmModal.$el.children.length).to.equal(2)
    // button
    triggerMouseEvents(vmModal.$el.querySelector('[type="button"]'), 'click')

    vmModal.$nextTick(() => {
      vmModal.$nextTick(() => {
        expect(vm.flag).to.equal('b')
        expect(vm.show).to.equal(false)
        done()
      })
    })
  })
})
