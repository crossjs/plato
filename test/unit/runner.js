import { argv } from 'yargs'
import spawn from 'cross-spawn'

export default server => {
  const args = [
    'start', 'test/unit/_karma.conf.js'
  ]
  if (argv.watch) {
    args.push('--watch')
  }
  const runner = spawn(
    './node_modules/.bin/karma',
    args,
    {
      stdio: 'inherit'
    }
  )

  runner.on('exit', function (code) {
    server && server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server && server.close()
    throw err
  })
}
