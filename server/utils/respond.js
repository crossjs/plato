import { STATUS_CODES } from 'http'

export default (status, { message }, ctx) => {
  ctx.body = {
    code: STATUS_CODES[status],
    message
  }
  ctx.status = status || 500
}
