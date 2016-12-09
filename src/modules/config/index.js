import store from './store'
import { createRoutes } from './routes'
import translations from './i18n/zh.json'

export default ({ registerModule, registerRoutes, registerTranslations }, options = {}, next) => {
  const { name = 'config', prefix = 'config' } = options

  registerModule({ [name]: store })
  registerRoutes(createRoutes({ name, prefix }))
  registerTranslations({ [name]: translations })

  next(() => {
    __PROD__ || console.log(`use module "${name}", with prefix "${prefix}" for routes`)
  })
}
