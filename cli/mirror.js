require('babel-register')

const fs = require('fs')
const argv = require('yargs').argv
const paths = require('../config').paths

const re = /https?:\/\/registry\.[a-z.]+/g

function replaceLock (cb) {
  const lock = paths.base('npm-shrinkwrap.json')
  fs.readFile(lock, (err, buf) => {
    if (err) {
      console.error(err)
    } else {
      let content = buf.toString()
      content = content.replace(re, argv.registry)
      fs.writeFile(lock, content, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`registries in "npm-shrinkwrap.json" were replaced with "${argv.registry}"`)
          cb()
        }
      })
    }
  })
}

function replaceRc () {
  const rc = paths.base('.npmrc')
  fs.readFile(rc, (err, buf) => {
    if (err) {
      console.error(err)
    } else {
      let content = buf.toString()
      content = content.replace(re, argv.registry)
      fs.writeFile(rc, content, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`registries in ".npmrc" were replaced with "${argv.registry}"`)
        }
      })
    }
  })
}

replaceLock(replaceRc)
