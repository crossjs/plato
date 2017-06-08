require('babel-register')

console.log('Clean dist files...')

require('rimraf')(require('../config').paths.dist('**'), err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Files cleaned.')
  }
})
