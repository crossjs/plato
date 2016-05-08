import config from '../.tools/config'

export default Object.assign({
  // Bearer Token 有效期
  bearer_expires: 60 * 60 * 1000
}, config)
