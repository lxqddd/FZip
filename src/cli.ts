#! /usr/bin/env node

import argv from 'minimist'
import { resolvePath } from './utils/index'

const argvObj = argv(process.argv.slice(2))
resolvePath(argvObj.f)
resolvePath(argvObj.o)

// console.log(argvObj)
