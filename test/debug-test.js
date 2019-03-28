'use strict'

const datadog = require('../src/datadog')

async function main () {
  const apiKey = process.env.DD_API_KEY
  const client = new datadog.Client({ apiKey })

  // await client.validate()
  await client.insert({ message: 'pino test', ddsource: 'bla', ddtags: 'foo:bar' })

  // let ws = client.insertStream()
  // ws.write({ id: 1 })
  // ws.end()
}

main()
