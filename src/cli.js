#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')
const pinoDataDog = require('././index')

// main cli logic
function main () {
  program
    .version(pkg.version)
    .option('-k, --key <key>', 'DataDog API Key')
    .option('-d, --ddsource <source>', 'Default source for the logs')
    .option('-t, --ddtags <tags>', 'Default tags for the logs')
    .option('-s, --service <service>', 'Default service for the logs')
    .option('--hostname <hostname>', 'Default hostname for the logs')
    .option('-e, --eu', 'Use Datadog EU site')
    .option('-b, --batch <size>', 'The number of log messages to send as a single batch (defaults to 1)')
    .option('--site <site>', 'Specify a datadog site (i.e. US, US3, US5, etc.). Defaults to US. If using EU, use the `eu` option instead.')
    .option('--no-stdout', 'Disable output to stdout')
    .action(async options => {
      try {
        const config = {
          apiKey: options.key || process.env.DD_API_KEY,
          ddsource: options.ddsource || process.env.DD_SOURCE,
          ddtags: options.ddtags || process.env.DD_TAGS,
          service: options.service || process.env.DD_SERVICE,
          hostname: options.hostname || process.env.DD_HOSTNAME,
          eu: options.eu || !!process.env.DD_EU,
          size: options.batch || 1,
          site: options.site
        }
        const writeStream = await pinoDataDog.createWriteStream(config)
        process.stdin.pipe(writeStream)

        if (options.stdout) {
          process.stdin.pipe(process.stdout)
        }
      } catch (error) {
        console.log(error.message)
      }
    })

  program.parse(process.argv)
}

main()
