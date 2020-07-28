# pino-datadog

[![CI](https://github.com/ovhemert/pino-datadog/workflows/CI/badge.svg)](https://github.com/ovhemert/pino-datadog/actions)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fbe6390adeba49a5a62349410a8439cc)](https://www.codacy.com/app/ovhemert/pino-datadog?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ovhemert/pino-datadog&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-datadog/badge.svg)](https://snyk.io/test/npm/pino-datadog)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-datadog/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-datadog?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This module provides a "transport" for [pino][pino] that forwards messages to a [DataDog][datadog].

## Installation

To use globally from command line:

```bash
$ npm install -g pino-datadog
```

To include as a library in your project:

```bash
$ npm install pino-datadog
```

## CLI

Want to use `pino-datadog` from the CLI?
See the [CLI](./docs/CLI.md) documentation for details.

## API

Want to use `pino-datadog` as a library in your project?
See the [API](./docs/API.md) documentation for details.

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://ovhemert.dev)

## Contributing

If you would like to help out with some code, check the [details](./docs/CONTRIBUTING.md).

Not a coder, but still want to support? Have a look at the options available to [donate](https://ovhemert.dev/donate).

## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[datadog]: https://www.datadoghq.com
