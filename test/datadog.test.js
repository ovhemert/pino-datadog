'use strict'

const test = require('tap').test
const tested = require('../src/datadog')
const sinon = require('sinon')

const axios = require('axios')

test('calls insert without document', t => {
  const client = new tested.Client()
  client.insert().then(data => {
    t.equals(data, undefined)
    t.end()
  })
})

test('errors on failed insert', async t => {
  const client = new tested.Client()
  const stubPost = sinon.stub(axios, 'post').rejects()
  const insert = client.insert({ message: 'crazy invalid document' })
  try {
    await t.rejects(insert)
  } finally {
    stubPost.restore()
    t.end()
  }
})

test('inserts single document', t => {
  const client = new tested.Client()
  const stubPost = sinon.stub(axios, 'post').resolvesArg(1)
  client.insert({ message: 'hello world' }).then(data => {
    t.equals(data.length, 1)
    t.equals(data[0].message, 'hello world')
    stubPost.restore()
    t.end()
  })
})

test('inserts multiple documents', t => {
  const client = new tested.Client()
  const stubPost = sinon.stub(axios, 'post').resolvesArg(1)
  client
    .insert([
      { message: 'test 1' },
      { message: 'test 2' },
      { message: 'test 3' }
    ])
    .then(data => {
      t.equals(data.length, 3)
      t.equals(data[0].message, 'test 1')
      t.equals(data[1].message, 'test 2')
      t.equals(data[2].message, 'test 3')
      stubPost.restore()
      t.end()
    })
})

test('inserts with write stream', t => {
  const client = new tested.Client()
  const stubPost = sinon.stub(axios, 'post')
  const ws = client.insertStream()
  ws.write({ message: 'test 1' })
  ws.end()
  t.ok(stubPost.called)
  stubPost.restore()
  t.end()
})

test('inserts sends com url and api key', async t => {
  const client = new tested.Client({ apiKey: '1234567890' })
  const stubPost = sinon.stub(axios, 'post')
  const items = [{ message: 'hello world !' }]

  await client.insert(items)
  t.ok(stubPost.called)
  t.ok(
    stubPost.calledWithMatch(
      'https://http-intake.logs.datadoghq.com/v1/input/1234567890',
      items,
      { params: {} }
    )
  )
  stubPost.restore()
  t.end()
})

test('inserts sends eu url and api key', async t => {
  const client = new tested.Client({ apiKey: '1234567890', eu: true })
  const stubPost = sinon.stub(axios, 'post')
  const items = [{ message: 'hello world !' }]

  await client.insert(items)
  t.ok(stubPost.called)
  t.ok(
    stubPost.calledWithMatch(
      'https://http-intake.logs.datadoghq.eu/v1/input/1234567890',
      items,
      { params: {} }
    )
  )
  stubPost.restore()
  t.end()
})

test('inserts sends extra parameters ', async t => {
  const client = new tested.Client({
    apiKey: '1234567890',
    ddsource: 'source',
    service: 'service',
    hostname: 'foobar.com'
  })
  const stubPost = sinon.stub(axios, 'post')
  const items = [{ message: 'hello world !' }]

  await client.insert(items)
  t.ok(stubPost.called)
  t.ok(
    stubPost.calledWithMatch(
      'https://http-intake.logs.datadoghq.com/v1/input/1234567890',
      items,
      {
        params: {
          ddsource: 'source',
          service: 'service',
          hostname: 'foobar.com'
        }
      }
    )
  )
  stubPost.restore()
  t.end()
})
