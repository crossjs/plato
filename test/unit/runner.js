import { argv } from 'yargs'
import spawn from 'cross-spawn'
import glob from 'glob'
import parse from 'lcov-parse'

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
    function exit () {
      server && server.close()
      process.exit(code)
    }
    glob('coverage/PhantomJS **/lcov.info', function (err, files) {
      if (err) {
        exit()
        return
      }
      if (files) {
        if (!files[0]) {
          exit()
          return
        }
        parse(files[0], function (err, data) {
          if (!err) {
            const sum = data.reduce((sum, { lines }) => {
              sum.found += lines.found
              sum.hit += lines.hit
              return sum
            }, {
              found: 0,
              hit: 0
            })
            console.log('\nCoverage average: ' + (sum.hit * 100 / sum.found).toFixed(2) + '% ( ' + sum.hit + '/' + sum.found + ' )\n')
          }
          // process the data here
          exit()
        })
      }
    })
  })

  runner.on('error', function (err) {
    console.log('error')
    server && server.close()
    throw err
  })
}
