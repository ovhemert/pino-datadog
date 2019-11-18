'use strict'

const datadog = require('./datadog')
const streams = require('./streams')
const pumpify = require('pumpify')

async function createWriteStream (options = {}) {
  return createWriteStreamSync(options)
}

function createWriteStreamSync (options = {}) {
  const { size = 1 } = options

  const parseJsonStream = streams.parseJsonStream()
  const toLogEntryStream = streams.toLogEntryStream()
  const batchStream = streams.batchStream(size)

  const client = new datadog.Client(options)
  const writeStream = client.insertStream()

  return pumpify(parseJsonStream, toLogEntryStream, batchStream, writeStream)
}

module.exports.createWriteStream = createWriteStream
module.exports.createWriteStreamSync = createWriteStreamSync
