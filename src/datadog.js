'use strict'

const axios = require('axios')
const stream = require('stream')

class Client {
  constructor (options = {}) {
    this._apiKey = options.apiKey
  }

  async insert (items = []) {
    const data = Array.isArray(items) ? items : [items]
    if (data.length <= 0) { return }
    try {
      const url = `https://http-intake.logs.datadoghq.com/v1/input/${this._apiKey}`
      const result = await axios.post(url, data)
      return result
    } catch (err) {
      console.error('The previous log have not been saved')
      console.error(err.stack || err)
    }
  }

  insertStream () {
    const self = this
    const writeStream = new stream.Writable({ objectMode: true, highWaterMark: 1 })
    writeStream._write = function (chunk, encoding, callback) {
      self.insert(chunk).then(() => { callback(null) }).catch(callback)
    }
    return writeStream
  }
}

module.exports = { Client }
