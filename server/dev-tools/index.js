import webpack from './webpack'
import mocking from './middleware/mocking'
import { paths } from '../config'

export default app => {
  webpack(app)

  app.use(mocking({
    root: paths.base(),
    matcher: /^\/apis\//,
    reducer: null
  }))
}
