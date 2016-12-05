import store from './store'
import routes from './routes'

export default Vue => () => {
  return { store, routes }
}
