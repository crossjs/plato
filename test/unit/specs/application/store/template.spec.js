import template from 'application/store/templates/rest'
import { ONE_MINUTE } from 'application/constants'

describe('env', () => {
  const mod = template({
    namespace: 'test',
    source: 'will-be-404',
    expires: ONE_MINUTE,
    memcache: ONE_MINUTE / 6, // cache for ten seconds
    initialState: {
      test: 'test'
    },
    getters: {
      test: state => state.test,
      items: state => state.entities,
      is_fetching: state => state.fetching
    }
  })

  it('should export state', () => {
    expect(mod.state.test).to.equal('test')
    expect(mod.state.fetching).to.equal(false)
    expect(mod.state.entities).to.eql({})
  })

  it('should export getters', () => {
    expect(mod.getters).to.have.all.keys('test', 'is_fetching', 'items')
    expect(mod.getters.test(mod.state)).to.equal('test')
    expect(mod.getters.is_fetching(mod.state)).to.equal(false)
    expect(mod.getters.items(mod.state)).to.eql({})
  })

  it('should export actions', () => {
    expect(mod.actions).to.have.all.keys('testList', 'testPost', 'testPut', 'testPatch', 'testDelete', 'testGet')
  })

  describe('should call actions correctly', () => {
    it('list', done => {
      mod.actions.testList({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('testList')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('post', done => {
      mod.actions.testPost({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('testPost')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('patch', done => {
      mod.actions.testPatch({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('testPatch')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('put', done => {
      mod.actions.testPut({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('testPut')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('delete', done => {
      mod.actions.testDelete({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('testDelete')
          if (__status__ === 'pending') {
            expect(typeof __payload__._.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })

    it('get', done => {
      mod.actions.testGet({
        commit (type, { __status__, __payload__ }) {
          expect(type).to.equal('testGet')
          if (__status__ === 'pending') {
            expect(typeof __payload__.then).to.equal('function')
          } else if (__status__ === 'error') {
            expect(__payload__).to.equal('NOT FOUND')
            done()
          }
        }
      })
    })
  })

  it('should export mutations', () => {
    expect(mod.mutations).to.have.all.keys('testList', 'testPost', 'testPut', 'testPatch', 'testDelete', 'testGet')
  })

  describe('should call mutations correctly', () => {
    it('list', () => {
      const state = {}
      mod.mutations.testList(state, {
        __status__: 'success',
        __payload__: [{ id: 'test' }]
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('post', () => {
      const state = {}
      mod.mutations.testPost(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('patch', () => {
      const state = {}
      mod.mutations.testPatch(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('put', () => {
      const state = {}
      mod.mutations.testPut(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })

    it('delete', () => {
      const state = {
        entities: {
          'test': {
            id: 'test'
          }
        }
      }
      mod.mutations.testDelete(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities).to.eql({})
    })

    it('get', () => {
      const state = {}
      mod.mutations.testGet(state, {
        __status__: 'success',
        __payload__: { id: 'test' }
      })
      expect(state.entities.test.id).to.equal('test')
    })
  })
})
