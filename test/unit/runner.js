import spawn from 'cross-spawn'

export default server => {
  const runner = spawn(
    './node_modules/.bin/karma',
    [
      'start', 'test/unit/_karma.conf.js'
    ],
    {
      stdio: 'inherit'
    }
  )

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
}
