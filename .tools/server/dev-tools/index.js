import webpack from './webpack'
import mocking from './middleware/mocking'
import { paths, server_mock } from '../../config'

export default app => {
  webpack(app)

  if (server_mock) {
    app.use(mocking({
      root: paths.base(),
      matcher: /^\/apis\//,
      reducer: null
    }))
  }
}
