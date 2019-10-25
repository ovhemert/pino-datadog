#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')
const pinoDataDog = require('././index')

// main cli logic
function main () {
  program
    .version(pkg.version)
    .option('-k, --key <key>', 'DataDog API Key')
    .action(async ({ key }) => {
      try {
        const apiKey = key || process.env.DD_API_KEY
        const writeStream = await pinoDataDog.createWriteStream({ apiKey })
        process.stdin.pipe(writeStream)
        process.stdin.pipe(process.stdout)
      } catch (error) {
        console.log(error.message)
      }
    })

  program.parse(process.argv)
}

main()
