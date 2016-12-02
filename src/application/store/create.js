import { Store } from 'vuex'
import plugins from './plugins'

export default modules => {
  return new Store({
    strict: __DEV__,
    plugins,
    modules
  })
}
