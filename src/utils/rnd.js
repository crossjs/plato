import { rnd } from 'vuex-localstorage'

export default prefix => {
  return __PROD__ ? rnd() : `${prefix}/${rnd()}`
}
