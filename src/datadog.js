'use strict'

const axios = require('axios')
const stream = require('stream')

class Client {
  constructor (options = {}) {
    this._options = options
  }

  async insert (items = []) {
    const data = Array.isArray(items) ? items : [items]
    if (data.length <= 0) {
      return
    }
    try {
      let site = ''
      if (this._options.site) {
        const siteLower = this._options.site.toLowerCase()
        if (siteLower !== 'us' && siteLower !== 'eu') {
          site = `${siteLower}.`
        }
      }

      const domain = this._options.eu
        ? 'https://http-intake.logs.datadoghq.eu'
        : `https://http-intake.logs.${site}datadoghq.com`
      const params = {}
      if (this._options.ddsource) {
        params.ddsource = this._options.ddsource
      }
      if (this._options.ddtags) {
        params.ddtags = this._options.ddtags
      }
      if (this._options.service) {
        params.service = this._options.service
      }
      if (this._options.hostname) {
        params.hostname = this._options.hostname
      }

      const url = `${domain}/v1/input/${this._options.apiKey}`
      const result = await axios.post(url, data, { params })
      return result
    } catch (err) {
      console.error('The previous log have not been saved')
      console.error(`${err.message}\n${err.stack}`)
    }
  }

  insertStream () {
    const self = this
    const writeStream = new stream.Writable({
      objectMode: true,
      highWaterMark: 1
    })
    writeStream._write = function (chunk, encoding, callback) {
      self
        .insert(chunk)
        .then(() => {
          callback(null)
        })
        .catch(callback)
    }
    return writeStream
  }
}

module.exports = { Client }
