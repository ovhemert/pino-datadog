'use strict'

const test = require('tap').test
const tested = require('../src/index')
// const sinon = require('sinon')

// const datadog = require('../src/datadog')

test('creates write stream', t => {
  // let stubValidate = sinon.stub(datadog.Client.prototype, 'validate').resolves()
  tested.createWriteStream().then(writeStream => {
    t.ok(writeStream.writable)
    // stubValidate.restore()
    t.end()
  }).catch(err => {
    t.fail(err.message)
    // stubValidate.restore()
    t.end()
  })
})
