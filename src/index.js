#!/usr/bin/env node
const inquirer = require('inquirer')
const path = require('path')
const { writeFile, readdir, readFile } = require('fs').promises

const configFiles = {}
const configFolderPath = path.resolve(__dirname, 'pretconf-template')

;(async () => {
  const files = await readdir(configFolderPath).catch(console.log)

  for (let i of files) {
    const configName = i.split('.')[1]
    configFiles[configName] = path.join(configFolderPath, i)
  }

  const { configPrompt } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Pick the config:',
      name: 'config',
      choices: Object.keys(configFiles),
    },
  ])

  let config = await readFile(configFiles[configPrompt]).catch(console.log)

  const tsconfig = path.join(process.cwd(), '.prettierrc.json')

  await writeFile(tsconfig, config.toString()).catch((err) => {
    console.log(err)
    process.exit()
  })

  console.log('.prettierrc.json successfully created')
})()
