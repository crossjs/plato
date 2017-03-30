import createStore from 'modules/config/create-store'

const { actions } = createStore()
const { addToast } = actions

const ADD_TOAST = 'ADD_TOAST'
// const DELETE_TOAST = 'DELETE_TOAST'

describe('config', function () {
  this.timeout(10000)

  it('should add/clear toast', done => {
    const state = {}
    const commit = (type, value) => {
      state.toast = type === ADD_TOAST ? value : null
    }
    addToast({
      state,
      commit
    }, 'test')
    expect(state.toast).to.equal('test')
    setTimeout(() => {
      expect(state.toast).to.be.null
      done()
    }, 4000)
  })

  it('should add/clear toast (2)', done => {
    const state = {}
    const commit = (type, value) => {
      state.toast = type === ADD_TOAST ? value : null
    }
    addToast({
      state,
      commit
    }, 'test')
    addToast({
      state,
      commit
    }, 'test1')
    expect(state.toast).to.equal('test')
    setTimeout(() => {
      expect(state.toast).to.equal('test1')
      setTimeout(() => {
        expect(state.toast).to.be.null
        done()
      }, 4000)
    }, 4000)
  })

  it('should add/clear toast (3)', done => {
    const state = {}
    const commit = (type, value) => {
      state.toast = type === ADD_TOAST ? value : null
    }
    addToast({
      state,
      commit
    }, 'test')
    expect(state.toast).to.equal('test')
    setTimeout(() => {
      addToast({
        state,
        commit
      }, 'test1')
      expect(state.toast).to.equal('test1')
      setTimeout(() => {
        expect(state.toast).to.be.null
        done()
      }, 4000)
    }, 4000)
  })
})
