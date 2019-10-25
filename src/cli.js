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
    .option('-s, --service <service>', 'Default service for the logs')
    .option('--hostname <hostname>', 'Default hostname for the logs')
    .option('-e, --eu', 'Use Datadog EU site')
    .action(async options => {
      try {
        const config = {
          apiKey: options.key || process.env.DD_API_KEY,
          ddsource: options.ddsource || process.env.DD_SOURCE,
          service: options.service || process.env.DD_SERVICE,
          hostname: options.hostname || process.env.DD_HOSTNAME,
          eu: options.eu || !!process.env.DD_EU
        }
        const writeStream = await pinoDataDog.createWriteStream(config)
        process.stdin.pipe(writeStream)
        console.info('logging')
      } catch (error) {
        console.log(error.message)
      }
    })

  program.parse(process.argv)
}

main()
