# API

The library exposes a function to write directly to DataDog from your own application. The example below shows how this can be done using [pino-multi-stream](https://github.com/pinojs/pino-multi-stream).

Example:

```js
const datadog = require('pino-datadog')
const pinoms = require('pino-multi-stream')
// create the datadog destination stream
const writeStream = await datadog.createWriteStream()
// create pino loggger
const logger = pinoms({ streams: [writeStream] })
// log some events
logger.info('Informational message')
logger.error(new Error('things got bad'), 'error message')
```

## Functions

### createWriteStream

The `createWriteStream` function creates a writestream that `pino-multi-stream` can use to send logs to.
**This function is async because of compatibility reasons*

Example:

```js
const writeStream = await datadog.createWriteStream({
  apiKey: 'blablabla',
  size: 10
})
````

### createWriteStreamSync

The `createWriteStreamSync` function creates a writestream that `pino-multi-stream` can use to send logs to.

Example:

```js
const writeStream = datadog.createWriteStreamSync({ apiKey: 'blablabla', size: 10 })
````

#### apiKey

Type: `String` *(required)*

The API key that can be found in your DataDog account (Integration > APIs).

#### size

Type: `String` *(optional)*

The number of log messages to send as a single batch (defaults to 1).

#### ddsource

Type: `String` *(optional)*

Set a default source to all the logs sent to datadog

#### ddtags

Type: `String` *(optional)*

Set a default list of tags for all the logs sent to datadog

#### service 

Type: `String` *(optional)*

Set a default service to all the logs sent to datadog

#### hostname

Type: `String` *(optional)*

Set a default hostname to all the logs sent to datadog
