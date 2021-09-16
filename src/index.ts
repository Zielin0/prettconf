#!/usr/bin/env node
import yargs from 'yargs'
import fs from 'fs-extra'
import path from 'path'

const args: any = yargs.options({
  name: {type: 'string', alias: 'n'}
}).argv

const srcDir  = `${path.resolve(__dirname)}/../pretconf-template`

if (args['name']) {
  fs.mkdir(`./${args['name']}`, (error: Error) => {
    if (error) {
      console.error(`Could not open ${args['name']} directory`)
      process.exit(1)
    }

    const destDir = `./${args['name']}`

    fs.copySync(srcDir, destDir)
    console.log('-- Successsfully created prettierconfig --')
    process.exit(0)
  })
} else {
  const destDir = '.'

  fs.copySync(srcDir, destDir)
  console.log('-- Successsfully created prettierconfig --')
  process.exit(0)
}

