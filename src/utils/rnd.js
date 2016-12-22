import { rnd } from 'vuex-localstorage'

export default prefix => {
  return __PROD__ ? rnd() : __TEST__ ? prefix : `${prefix}/${rnd()}`
}
