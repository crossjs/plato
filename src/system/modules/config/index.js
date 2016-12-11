import createStore from './create-store'

export default (context, options = {}, register) => {
  register({
    store: createStore(options)
  }, () => {
  })
}
