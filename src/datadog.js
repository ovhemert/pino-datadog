'use strict'

const axios = require('axios')
const stream = require('stream')

class Client {
  constructor (options = {}) {
    this._apiKey = options.apiKey
    this._apiUrl = options.apiUrl || 'https://http-intake.logs.datadoghq.com/v1/'
  }

  async insert (items = []) {
    const data = Array.isArray(items) ? items : [items]
    if (data.length <= 0) { return }
    try {
      const url = `${this._apiUrl}input/${this._apiKey}`
      const result = await axios.post(url, data)
      return result
    } catch (err) {
      throw Error(err.message)
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
