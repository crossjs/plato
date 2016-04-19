require('babel-register')

const config = require('../config')
const debug = require('debug')('koa:bin:compile')

debug('Create webpack compiler.')
const webpackConfig = require('../webpack')
// require('fs').writeFile('webpackConfig-prod', JSON.stringify(webpackConfig, null, 4))
const compiler = require('webpack')(webpackConfig)

compiler.run((err, stats) => {
  const jsonStats = stats.toJson()

  debug('Webpack compile completed.')
  console.log(stats.toString(config.compiler_stats))

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    console.log(jsonStats.errors)
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')

    if (config.compiler_fail_on_warning) {
      process.exit(1)
    }
  } else {
    debug('No errors or warnings encountered.')
  }
})
