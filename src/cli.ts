#! /usr/bin/env node

import argv from 'minimist'
import ansiColors from 'ansi-colors'
import { Command } from 'commander'
import compression from './core'
import { ICompressParams } from './types'
import { formatCompressParams, getVersion } from './utils'

const program = new Command()
const argvObj = argv(process.argv.slice(2))

if (argvObj.help || argvObj.h) {
  program.name('Fzip')
    .description('A compression tool')
    .version(getVersion())
    .option('-f, --from', 'path to compressed file')
    .option('-o, --output', 'compression result output path')
    .option('-l, --level', 'compression level, you can use 1~9')
    .option('-n, --name', 'rename compression result name')
  program.parse()
} else if (argvObj.V || argvObj.version) {
  console.log(ansiColors.yellow(getVersion()))
} else {
  const compressParams: ICompressParams = formatCompressParams(argvObj)
  compression(compressParams)
}
