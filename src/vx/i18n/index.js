import utils from 'vx/utils'

export default {
  languages: [],
  resources: require(`./${utils.getEnv().lang}.json`)
}
