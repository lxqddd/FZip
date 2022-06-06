#! /usr/bin/env node

import argv from 'minimist'
import compression from './core'
import { ICompressParams } from './types'
import { formatCompressParams } from './utils'

const argvObj = argv(process.argv.slice(2))

console.log(argvObj)

const compressParams: ICompressParams = formatCompressParams(argvObj)

compression(compressParams)
