#! /usr/bin/env node

import argv from 'minimist'
import { resolvePath } from './utils/index'
import { compressSingleFile } from './core'

const argvObj = argv(process.argv.slice(2))
resolvePath(argvObj.f)
resolvePath(argvObj.o)

const { f: inputPathName, o: outPathName, l: level } = argvObj
compressSingleFile(inputPathName, outPathName, level)

console.log(argvObj)
