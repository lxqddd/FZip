#! /usr/bin/env node

import argv from 'minimist'
import ansiColors from 'ansi-colors'
import compression from './core'
import { ICompressParams } from './types'
import { formatCompressParams, getVersion } from './utils'

const argvObj = argv(process.argv.slice(2))

if (argvObj.v || argvObj.V || argvObj.version) {
  const version = getVersion()
  console.log(ansiColors.yellow(version))
} else {
  const compressParams: ICompressParams = formatCompressParams(argvObj)
  compression(compressParams)
}
