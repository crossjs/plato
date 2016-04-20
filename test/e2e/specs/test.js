// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': browser => {
    browser
    .url('http://localhost:3000')
      .waitForElementVisible('.container', 5000)
      .assert.elementPresent('.logo')
      .assert.containsText('a', 'Logo')
      .assert.elementCount('nav', 1)
      .end()
  }
}
