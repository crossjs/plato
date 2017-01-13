import chai from 'chai'
import sinonChai from 'sinon-chai'
import { triggerHTMLEvents, triggerMouseEvents, triggerTouchEvents } from './utils'

localStorage.clear()

chai.use(sinonChai)

global.triggerHTMLEvents = triggerHTMLEvents
global.triggerMouseEvents = triggerMouseEvents
global.triggerTouchEvents = triggerTouchEvents
global.assert = chai.assert
global.expect = chai.expect

// Reset styles
document.body.style.margin = '0px'
document.body.style.padding = '0px'

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)

// require all src files except index.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const componentsContext = require.context('../../src/', true, /^templates\/.*\.(js|vue)$/)
componentsContext.keys().forEach(componentsContext)
