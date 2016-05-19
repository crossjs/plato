import Vue from 'vue'
import Modal from 'solo/c-modal'
import { triggerMouseEvents } from '../../utils'

describe('modal.vue', () => {
  before(() => {
    const el = document.createElement('div')
    el.id = 'el'
    document.body.appendChild(el)
  })
  it('should render correct contents', done => {
    const vm = new Vue({
      el: '#el',
      template: `<div>
          <modal
            :show.sync="show"
            :body="body"
            :callback="callback"></modal>
        </div>`,
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
