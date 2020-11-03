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
      const domain = this._options.eu
        ? 'https://http-intake.logs.datadoghq.eu'
        : 'https://http-intake.logs.datadoghq.com'
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

      const basePath = `/v1/input/${this._options.apiKey}`
      if (this._options.noWait) {
        const http = require('https')
        const dataString = JSON.stringify(data)
        let paramString = ''
        Object.keys(params).forEach(k => { paramString += `&${k}=${params[k]}` })
        if (paramString.length > 0) {
          paramString = '?' + paramString.substring(1)
        }
        const options = {
          hostname,
          path: `${basePath}${paramString}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': dataString.length
          }
        }
        const req = http.request(options)
        req.write(dataString)
        req.end()
        return {}
      } else {
        const url = `${hostname}${basePath}`
        return await axios.post(`https://${url}`, data, { params })
      }
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
