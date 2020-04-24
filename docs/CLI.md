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

You can pass the following options via cli arguments or use the environment variable associated:

| Short command | Full command | Environment variable | Description |
| --- | --- | --- | --- |
| -V | --version | | Output the version number |
| -k | --key &lt;apikey&gt; | DD_API_KEY | The API key that can be found in your DataDog account |
| -d | --ddsource &lt;source&gt; | DD_SOURCE | Default source for the logs |
| -t | --ddtags &lt;tags&gt; | DD_TAGS | Default list of tags for the logs |
| -s, --service &lt;service&gt; | DD_SERVICE | Default service for the logs |
| | --hostname &lt;hostname&gt; | DD_HOSTNAME | Default hostname for the logs |
| -e | --eu | DD_EU | Use Datadog EU site |
| -b | --batch &lt;size&gt; | | The number of log messages to send as a single batch (defaults to 1) |
| -h | --help | | Output usage information |
| | --no-stdout | | Disable output to stdout |

See the [API](./API.md) documentation for details.
