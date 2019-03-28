'use strict'

const test = require('tap').test
const tested = require('../src/datadog')
const sinon = require('sinon')

let axios = require('axios')

test('creates client', t => {
  const client = new tested.Client({ apiKey: '1234567890' })
  t.equals(client._apiKey, '1234567890')
  t.end()
})

test('calls insert without document', t => {
  let client = new tested.Client()
  client.insert().then(data => {
    t.equals(data, undefined)
    t.end()
  })
})

test('errors on failed insert', async t => {
  let client = new tested.Client()
  let stubPost = sinon.stub(axios, 'post').rejects()
  const insert = client.insert({ message: 'crazy invalid document' })
  try {
    await t.rejects(insert)
  } finally {
    stubPost.restore()
    t.end()
  }
})

test('inserts single document', t => {
  let client = new tested.Client()
  let stubPost = sinon.stub(axios, 'post').resolvesArg(1)
  client.insert({ message: 'hello world' }).then(data => {
    t.equals(data.length, 1)
    t.equals(data[0].message, 'hello world')
    stubPost.restore()
    t.end()
  })
})

test('inserts multiple documents', t => {
  let client = new tested.Client()
  let stubPost = sinon.stub(axios, 'post').resolvesArg(1)
  client.insert([{ message: 'test 1' }, { message: 'test 2' }, { message: 'test 3' }]).then(data => {
    t.equals(data.length, 3)
    t.equals(data[0].message, 'test 1')
    t.equals(data[1].message, 'test 2')
    t.equals(data[2].message, 'test 3')
    stubPost.restore()
    t.end()
  })
})

test('inserts with write stream', t => {
  let client = new tested.Client()
  let stubPost = sinon.stub(axios, 'post')
  let ws = client.insertStream()
  ws.write({ message: 'test 1' })
  ws.end()
  t.ok(stubPost.called)
  t.end()
})
