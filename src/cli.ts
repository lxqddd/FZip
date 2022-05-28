#! /usr/bin/env node

import argv from 'minimist'
import compress from './core'
import { ICompressParams } from './types'
import { formatCompressParams } from './utils'

const argvObj = argv(process.argv.slice(2))
const compressParams: ICompressParams = formatCompressParams(argvObj)

compress(compressParams)
