# CLI

To use `pino-datadog` from the command line, you need to install it globally:

```bash
$ npm install -g pino-datadog
```

## Example

Given an application `foo` that logs via pino, you would use `pino-datadog` like so:

```bash
$ node foo | pino-datadog --key blablabla
```

## Usage

You can pass the following options via cli arguments:

| Short command | Full command | Description |
| ------------- | ------------ |-------------|
| -V | --version | Output the version number |
| -k | --key &lt;apikey&gt; | The API key that can be found in your DataDog account |
| -b | --batch &lt;size&gt; | The number of log messages to send as a single batch (defaults to 1) |
| -h | --help | Output usage information |

See the [API](./API.md) documentation for details.
